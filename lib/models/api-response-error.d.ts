import { ApiResponse } from "./api-response";
export declare class ApiResponseError extends ApiResponse {
    constructor(error: any[], status: number);
}
