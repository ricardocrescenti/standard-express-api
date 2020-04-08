import { ApiResponseError } from "./api-response-error";

export abstract class ApiResponse {

    data?: any;
    errors?: any[];
    info?: any;
    status?: number;

    constructor(data: any, errors: any[] | undefined, status: number) {
        this.data = data;
        this.errors = errors;
        this.status = status;
    }
}