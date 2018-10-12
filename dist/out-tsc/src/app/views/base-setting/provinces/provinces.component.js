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
var ProvincesComponent = /** @class */ (function () {
    function ProvincesComponent() {
        this.totalItems = 3; // change by APi
        this.currentPage = 1;
        this.maxSize = 2; //constant
        this.itemsPerPage = 1; //constant
    }
    ProvincesComponent.prototype.ngOnInit = function () {
        this.tmp = [{
                id: 1,
                province_name: 'A',
                is_active: true
            }, {
                id: 2,
                province_name: 'b',
                is_active: true
            },
            {
                id: 3,
                province_name: 'c',
                is_active: false
            }];
        this.getProvinces();
    };
    ProvincesComponent.prototype.pageChanged = function (event) {
        this.currentPage = event.page;
        this.getProvinces();
    };
    ProvincesComponent.prototype.getProvinces = function () {
        this.provinces = Array(this.tmp[this.currentPage - 1]);
        this.totalItems = this.tmp.length;
        console.log(this.provinces);
    };
    ProvincesComponent = __decorate([
        core_1.Component({
            selector: 'app-provinces',
            templateUrl: './provinces.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], ProvincesComponent);
    return ProvincesComponent;
}());
exports.ProvincesComponent = ProvincesComponent;
//# sourceMappingURL=provinces.component.js.map