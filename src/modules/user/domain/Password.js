"use strict";
exports.__esModule = true;
exports.Password = void 0;
var uuid_1 = require("uuid");
var Password = /** @class */ (function () {
    function Password(value, key) {
        this.value = value;
        this.key = key || (0, uuid_1.v4)();
    }
    Password.prototype.getValue = function () {
        return this.value;
    };
    Password.prototype.getKey = function () {
        return this.key;
    };
    return Password;
}());
exports.Password = Password;
