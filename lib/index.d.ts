/// <reference types="node" />
/// <reference types="jest" />
import express = require("express");
import { ApiResponse } from './models/api-response';
import { ApiResponseData } from './models/api-responde-data';
import { ApiResponseError } from './models/api-response-error';
import { ICreationSchemaOptions } from "graphql-schema-creator";
import Knex = require("knex");
export declare type NextFunction = (error?: any | Error) => void;
export declare type ApiRequestFunction = (req: any, res: any, next: NextFunction) => void;
export declare class StandardExpressApi {
    port: string | number;
    environment: string;
    welcomeMessage?: string;
    bodyLimit: string;
    graphqlSchemaOptions?: ICreationSchemaOptions;
    express: express.Express;
    knex?: Knex;
    /** initialize database
     * @param knexFile Knex file. Ex: require(__dirname + '/../../knexfile')
     */
    initializeDatabase(knexFile: NodeRequire): void;
    /** Start server */
    start(): Promise<boolean>;
}
export declare function notFoundRoute(req: any, res: any, next: any): void;
export declare function responseHandler(handler: Error | ApiResponse, request: any, response: any, next: any): void;
export { ApiResponse, ApiResponseData, ApiResponseError };
