"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Apollo = require("apollo-server-express");
const bodyParser = require("body-parser");
const express = require("express");
const api_response_1 = require("./models/api-response");
exports.ApiResponse = api_response_1.ApiResponse;
const api_responde_data_1 = require("./models/api-responde-data");
exports.ApiResponseData = api_responde_data_1.ApiResponseData;
const api_response_error_1 = require("./models/api-response-error");
exports.ApiResponseError = api_response_error_1.ApiResponseError;
const graphql_schema_creator_1 = require("graphql-schema-creator");
class StandardExpressApi {
    constructor() {
        this.port = process.env.PORT || 3001;
        this.environment = process.env.NODE_ENV || 'development';
        this.bodyLimit = '1mb';
        this.express = express();
    }
    /** initialize database
     * @param knexFile Knex file. Ex: require(__dirname + '/../../knexfile')
     */
    initializeDatabase(knexFile) {
        const configuration = knexFile[this.environment];
        this.knex = require('knex')(configuration);
    }
    /** Start server */
    start() {
        console.info('Starting Express server');
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.express.use(bodyParser.json({ limit: this.bodyLimit }));
            this.express.use(bodyParser.urlencoded({ extended: true, limit: this.bodyLimit }));
            if (this.welcomeMessage) {
                this.express.get('/', (req, res, next) => {
                    res.send(this.welcomeMessage);
                });
            }
            if (this.graphqlSchemaOptions) {
                console.info('Starting GraphQL server');
                const schema = yield graphql_schema_creator_1.GraphQLSchema.initialize(this.knex, this.graphqlSchemaOptions);
                const graphql = new Apollo.ApolloServer(schema.createExecutableSchema());
                graphql.applyMiddleware({ app: this.express });
            }
            this.express.use(notFoundRoute);
            this.express.use(responseHandler);
            this.express.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));
            return true;
        }));
    }
}
exports.StandardExpressApi = StandardExpressApi;
function notFoundRoute(req, res, next) {
    next(new api_response_error_1.ApiResponseError([`Invalid route ${req.url} (${req.method})`], 404));
}
exports.notFoundRoute = notFoundRoute;
function responseHandler(handler, request, response, next) {
    let result;
    if (!(handler instanceof api_response_1.ApiResponse)) {
        result = new api_response_error_1.ApiResponseError([{ message: 'Non-standard return', data: handler }], 500);
    }
    else {
        result = handler;
    }
    response.status(result.status).json(result);
}
exports.responseHandler = responseHandler;
