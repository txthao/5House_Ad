"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.VALIDATE_CODE = 'VALIDATION.VALIDATE_CODE.';
    // status 
    Constants.STATUS_CLOSED = 0;
    Constants.STATUS_OPENING = 1;
    //parking
    Constants.PARKING_NO = 0;
    Constants.PARKING_YES = 1;
    //Default
    Constants.CANCELLATION_DEFAULT = 0;
    Constants.CLEANING_TIME_DEFAULT = "00:00";
    Constants.RESTAURANT_UNIT_DEFAULT = 1;
    Constants.UNIT_PRICE_DEFAULT = 0;
    //unit
    Constants.UNIT_MINUTE = 0;
    Constants.UNIT_HOUR = 1;
    //disable - enable
    Constants.DISABLE = 0;
    Constants.ENABLE = 1;
    //weekdays
    Constants.WEEKDAYS_SUNDAY = 0;
    Constants.WEEKDAYS_MONDAY = 1;
    Constants.WEEKDAYS_TUESDAY = 2;
    Constants.WEEKDAYS_WEDNESDAY = 3;
    Constants.WEEKDAYS_THURSDAY = 4;
    Constants.WEEKDAYS_FRIDAY = 5;
    Constants.WEEKDAYS_SATURDAY = 6;
    //translated value
    Constants.STATUS = [
        { "key": 0, "value": "CONSTANTS.STATUS.CLOSED" },
        { "key": 1, "value": "CONSTANTS.STATUS.OPENING" },
    ];
    Constants.PARKING = [
        { "key": 0, "value": "CONSTANTS.PARKING.NO" },
        { "key": 1, "value": "CONSTANTS.PARKING.YES" },
    ];
    Constants.CANCELLATION = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    Constants.WEEKDAYS = [
        { "key": 0, "value": "CONSTANTS.WEEKDAYS.SUNDAY" },
        { "key": 1, "value": "CONSTANTS.WEEKDAYS.MONDAY" },
        { "key": 2, "value": "CONSTANTS.WEEKDAYS.TUESDAY" },
        { "key": 3, "value": "CONSTANTS.WEEKDAYS.WEDNESDAY" },
        { "key": 4, "value": "CONSTANTS.WEEKDAYS.THURSDAY" },
        { "key": 5, "value": "CONSTANTS.WEEKDAYS.FRIDAY" },
        { "key": 6, "value": "CONSTANTS.WEEKDAYS.SATURDAY" },
    ];
    Constants.HOURS = [
        "00:00", "00:15", "00:30", "00:45", "01:00", "01:15", "01:30", "01:45",
        "02:00", "02:15", "02:30", "02:45", "03:00", "03:15", "03:30", "03:45",
        "04:00", "04:15", "04:30", "04:45", "05:00", "05:15", "05:30", "05:45",
        "06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45",
        "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45",
        "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
        "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
        "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45",
        "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45",
        "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45",
        "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45",
        "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45"
    ];
    Constants.REQUIRED_PAYMENT = [
        { "key": 0, "value": "CONSTANTS.REQUIRED_PAYMENT.YES" },
        { "key": 1, "value": "CONSTANTS.REQUIRED_PAYMENT.NO" },
    ];
    Constants.BUSINESS_HOUR_STATUS = [
        { "key": 0, "value": "CONSTANTS.BUSINESS_HOUR_STATUS.CLOSED" },
        { "key": 1, "value": "CONSTANTS.BUSINESS_HOUR_STATUS.OPENING" },
    ];
    Constants.RESTAURANT_UNIT = [
        { "key": 0, "value": "CONSTANTS.UNIT.MINUTE" },
        { "key": 1, "value": "CONSTANTS.UNIT.HOUR" },
    ];
    Constants.ADVANCE_PAYMENT = [
        { "key": false, "value": "CONSTANTS.REQUIRED_PAYMENT.NO" },
        { "key": true, "value": "CONSTANTS.REQUIRED_PAYMENT.YES" },
    ];
    Constants.FEATURES = [
        { "key": 1, "value": "CONSTANTS.FEATURE.RESERVATION" },
    ];
    Constants.CARDS = [
        { "key": 0, "value": "VISA" },
        { "key": 1, "value": "MasterCard" },
        { "key": 2, "value": "JCB" },
        { "key": 3, "value": "AMERICAN EXPRESS" },
        { "key": 4, "value": "Diners Club INTERNATIONAL" },
        { "key": 5, "value": "DISCOVER NETWORK" },
        { "key": 6, "value": "PAYID" },
    ];
    Constants.UNIT_PRICE = [
        { "key": 0, "value": "円" },
    ];
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map