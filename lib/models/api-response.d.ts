export declare abstract class ApiResponse {
    data?: any;
    errors?: any[];
    info?: any;
    status?: number;
    constructor(data: any, errors: any[] | undefined, status: number);
}
