"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var base_setting_routing_module_1 = require("./base-setting-routing.module");
var shared_module_1 = require("../../shared/shared.module");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var pagination_1 = require("ngx-bootstrap/pagination");
var provinces_component_1 = require("./provinces/provinces.component");
var provinces_edit_component_1 = require("./provinces/provinces-edit/provinces-edit.component");
var BaseSettingModule = /** @class */ (function () {
    function BaseSettingModule() {
    }
    BaseSettingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                base_setting_routing_module_1.BaseSettingRoutingModule,
                dropdown_1.BsDropdownModule.forRoot(),
                pagination_1.PaginationModule.forRoot(),
            ],
            declarations: [
                provinces_component_1.ProvincesComponent,
                provinces_edit_component_1.ProvincesEditComponent
            ]
        })
    ], BaseSettingModule);
    return BaseSettingModule;
}());
exports.BaseSettingModule = BaseSettingModule;
//# sourceMappingURL=base-setting.module.js.map