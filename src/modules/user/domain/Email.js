"use strict";
exports.__esModule = true;
exports.Email = void 0;
var uuid_1 = require("uuid");
var Email = /** @class */ (function () {
    function Email(value, key) {
        this.value = value || '';
        this.key = key || (0, uuid_1.v4)();
    }
    Email.prototype.getValue = function () {
        return this.value;
    };
    Email.prototype.getKey = function () {
        return this.key;
    };
    return Email;
}());
exports.Email = Email;
