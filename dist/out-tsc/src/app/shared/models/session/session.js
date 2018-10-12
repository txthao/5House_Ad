"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session = /** @class */ (function () {
    function Session(token, id, name, email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }
    Session.prototype.updateToken = function (newToken) {
        this.token = newToken;
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map