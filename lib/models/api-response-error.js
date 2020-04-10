"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_response_1 = require("./api-response");
class ApiResponseError extends api_response_1.ApiResponse {
    constructor(error, status) {
        super(null, error, status);
    }
}
exports.ApiResponseError = ApiResponseError;
