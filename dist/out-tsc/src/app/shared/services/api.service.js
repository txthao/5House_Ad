"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var api_constants_1 = require("../config/api-constants");
var APIService = /** @class */ (function () {
    function APIService(httpClient) {
        this.httpClient = httpClient;
    }
    APIService.prototype.apiGet = function (path, params, hasToken) {
        if (params === void 0) { params = null; }
        if (hasToken === void 0) { hasToken = true; }
        // set url
        var url = this.appendUrl(path);
        // set header
        var headers = new http_1.HttpHeaders();
        if (hasToken) {
            headers = this.appendAuthorizationHeader(headers);
        }
        // return http client
        return this.httpClient.get(url, {
            headers: headers,
            params: params
        });
    };
    APIService.prototype.apiPost = function (path, body, params, hasToken) {
        if (body === void 0) { body = null; }
        if (params === void 0) { params = null; }
        if (hasToken === void 0) { hasToken = true; }
        // set url
        var url = this.appendUrl(path);
        // set header
        var headers = new http_1.HttpHeaders();
        if (hasToken) {
            headers = this.appendAuthorizationHeader(headers);
        }
        // return http client
        return this.httpClient.post(url, body, {
            params: params,
            headers: headers
        });
    };
    APIService.prototype.appendUrl = function (path) {
        if (path.startsWith('/')) {
            return "" + api_constants_1.ApiConstants.URL + path;
        }
        return api_constants_1.ApiConstants.URL + "/" + path;
    };
    APIService.prototype.appendAuthorizationHeader = function (headers) {
        var token = localStorage.getItem('token');
        if (token != null) {
            headers = headers.set(api_constants_1.ApiConstants.HEADER_AUTH, token);
        }
        return headers;
    };
    APIService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
//# sourceMappingURL=api.service.js.map