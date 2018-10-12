"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../../../environments/environment");
var ApiConstants = /** @class */ (function () {
    function ApiConstants() {
    }
    ApiConstants.URL = environment_1.environment.apiUrl;
    ApiConstants.HEADER_AUTH = environment_1.environment.apiHeaderAuth;
    return ApiConstants;
}());
exports.ApiConstants = ApiConstants;
//# sourceMappingURL=api-constants.js.map