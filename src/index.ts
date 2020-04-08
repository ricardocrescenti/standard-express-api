import Apollo = require('apollo-server-express');
import bodyParser = require('body-parser');
import express = require("express");
import { ApiResponse } from './models/api-response';
import { ApiResponseData } from './models/api-responde-data';
import { ApiResponseError } from './models/api-response-error';
import { GraphQLSchema, ICreationSchemaOptions } from "graphql-schema-creator";
import Knex = require("knex");

export type NextFunction = (error?: any | Error) => void;
export type ApiRequestFunction = (req: any, res: any, next: NextFunction) => void;

export class StandardExpressApi {
    port = process.env.PORT || 3001;
    environment: string = process.env.NODE_ENV || 'development';
    welcomeMessage?: string;
    bodyLimit: string = '1mb';
    graphqlSchemaOptions?: ICreationSchemaOptions;
    express: express.Express = express();
    knex?: Knex;

    /** initialize database
     * @param knexFile Knex file. Ex: require(__dirname + '/../../knexfile')
     */
    public initializeDatabase(knexFile: NodeRequire) {
        const configuration = (knexFile as any)[this.environment];
        this.knex = require('knex')(configuration);
    }

    /** Start server */
    public start() {
        console.info('Starting Express server');
        return new Promise<boolean>(async (resolve, reject) => {
            
            this.express.use(bodyParser.json({limit: this.bodyLimit}));
            this.express.use(bodyParser.urlencoded({ extended: true, limit: this.bodyLimit}));
        
            if (this.welcomeMessage) {
                this.express.get('/', (req, res, next) => {
                    res.send(this.welcomeMessage);
                });
            }

            if (this.graphqlSchemaOptions) {
                console.info('Starting GraphQL server');
                const schema: GraphQLSchema = await GraphQLSchema.initialize(this.knex as Knex, this.graphqlSchemaOptions);
                const graphql = new Apollo.ApolloServer(schema.createExecutableSchema());
                
                graphql.applyMiddleware({ app: this.express });
            }

            this.express.use(notFoundRoute);
            this.express.use(responseHandler);
        
            this.express.listen(this.port, () => console.log(`Server listening on port ${this.port}!`));

            return true;
        });
    }
}

export function notFoundRoute(req: any, res: any, next: any) {
    next(new ApiResponseError([`Invalid route ${req.url} (${req.method})`], 404));
}

export function responseHandler(handler: Error | ApiResponse, request: any, response: any, next: any) {
    let result: ApiResponse;
    
    if (!(handler instanceof ApiResponse)) {
        result = new ApiResponseError([{ message: 'Non-standard return', data: handler }], 500);
	} else {
        result = handler;
    }

    response.status(result.status).json(result);
}

export {
    ApiResponse,
    ApiResponseData,
    ApiResponseError
};