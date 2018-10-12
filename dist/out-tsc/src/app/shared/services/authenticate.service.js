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
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var rxjs_1 = require("rxjs");
var session_1 = require("../models/session/session");
var AuthenticateService = /** @class */ (function () {
    function AuthenticateService() {
        this.sessionSource = new rxjs_1.BehaviorSubject(null);
        this.session$ = this.sessionSource.asObservable();
        var token = localStorage.getItem('token');
        if (token != null) {
            var name_1 = localStorage.getItem('name');
            var id = localStorage.getItem('id');
            var email = localStorage.getItem('email');
            var session = new session_1.Session(token, id, name_1, email);
            this.setSession(session);
        }
    }
    AuthenticateService.prototype.setSession = function (session) {
        //save data into local storage
        localStorage.setItem('token', session.token);
        localStorage.setItem('id', session.id);
        localStorage.setItem('name', session.name || '');
        localStorage.setItem('email', session.email || '');
        this.sessionSource.next(session);
    };
    AuthenticateService.prototype.clearSession = function () {
        localStorage.clear();
        this.sessionSource.next(null);
    };
    AuthenticateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AuthenticateService);
    return AuthenticateService;
}());
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate.service.js.map