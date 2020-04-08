import { ApiResponse } from "./api-response";

export class ApiResponseData extends ApiResponse {
    constructor(data: any) {
        super(data, undefined, 200);
    } 
}