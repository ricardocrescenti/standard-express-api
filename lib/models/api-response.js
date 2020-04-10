"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(data, errors, status) {
        this.data = data;
        this.errors = errors;
        this.status = status;
    }
}
exports.ApiResponse = ApiResponse;
