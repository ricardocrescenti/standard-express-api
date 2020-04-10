"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_response_1 = require("./api-response");
class ApiResponseData extends api_response_1.ApiResponse {
    constructor(data) {
        super(data, undefined, 200);
    }
}
exports.ApiResponseData = ApiResponseData;
