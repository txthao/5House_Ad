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
var _nav_1 = require("./../../_nav");
var DefaultLayoutComponent = /** @class */ (function () {
    function DefaultLayoutComponent() {
        var _this = this;
        this.navItems = _nav_1.navItems;
        this.sidebarMinimized = true;
        this.element = document.body;
        this.changes = new MutationObserver(function (mutations) {
            _this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
        });
        this.changes.observe(this.element, {
            attributes: true
        });
    }
    DefaultLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './default-layout.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], DefaultLayoutComponent);
    return DefaultLayoutComponent;
}());
exports.DefaultLayoutComponent = DefaultLayoutComponent;
//# sourceMappingURL=default-layout.component.js.map