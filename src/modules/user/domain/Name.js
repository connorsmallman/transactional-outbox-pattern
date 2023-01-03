"use strict";
exports.__esModule = true;
exports.Name = void 0;
var uuid_1 = require("uuid");
var Name = /** @class */ (function () {
    function Name(value, key) {
        this.value = value;
        this.key = key || (0, uuid_1.v4)();
    }
    Name.prototype.getValue = function () {
        return this.value;
    };
    Name.prototype.getKey = function () {
        return this.key;
    };
    return Name;
}());
exports.Name = Name;
