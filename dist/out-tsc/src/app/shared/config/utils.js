"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isEmail = function (email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };
    Utils.isIdentificationExpiredDay = function (identificationExpiredDay) {
        return (new Date()) < identificationExpiredDay;
    };
    Utils.isDateEmpty = function (date) {
        if (date) {
            return false;
        }
        return true;
    };
    Utils.isName = function (name) {
        var charsCount = name.trim().length;
        return charsCount >= 4 && charsCount <= 25;
    };
    Utils.isWebsite = function (websiteUrl) {
        var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return regex.test(websiteUrl);
    };
    Utils.isPhone = function (tel) {
        var regex = /^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
        return regex.test(tel);
    };
    Utils.isFax = function (fax) {
        var regex = /^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/;
        return regex.test(fax);
    };
    Utils.toLocalDateTime = function (date) {
        var localString = moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        return localString.toString();
    };
    Utils.toLocalDate = function (date) {
        var localString = moment(date).format(moment.HTML5_FMT.DATE);
        return localString.toString();
    };
    Utils.toDateTimePicker = function (date) {
        var localString = moment(date).format('YYYY-MM-DD H:mm:ss');
        return localString.toString();
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map