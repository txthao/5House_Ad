"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_po_1 = require("./app.po");
describe('core-ui App', function () {
    var page;
    beforeEach(function () {
        page = new app_po_1.CoreUIPage();
    });
    it('should display footer containing creativeLabs', function () {
        page.navigateTo();
        expect(page.getParagraphText()).toContain('creativeLabs');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map