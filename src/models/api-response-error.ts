import { ApiResponse } from "./api-response";

export class ApiResponseError extends ApiResponse {
    constructor(error: any[], status: number) {
        super(null, error, status);
    }
}