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
var router_1 = require("@angular/router");
var authenticate_service_1 = require("./authenticate.service");
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.authService.session$.subscribe(function (data) { _this.session = data; });
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        if (this.session && this.session.token) {
            return true;
        }
        updateRedirectRoute(state);
        return false;
    };
    AuthGuardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [authenticate_service_1.AuthenticateService, router_1.Router])
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
function updateRedirectRoute(state) {
    if (this.session) {
        this.router.navigate(['/']);
    }
    else {
        // Store the attempted URL for redirecting & navigate to login page
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/users/signin']);
    }
}
//# sourceMappingURL=auth-guard.service.js.map