"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var CoreUIPage = /** @class */ (function () {
    function CoreUIPage() {
    }
    CoreUIPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    CoreUIPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.tagName('footer')).getText();
    };
    return CoreUIPage;
}());
exports.CoreUIPage = CoreUIPage;
//# sourceMappingURL=app.po.js.map