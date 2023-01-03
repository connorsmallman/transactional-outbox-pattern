"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Organisation = void 0;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var Organisation = /** @class */ (function (_super) {
    __extends(Organisation, _super);
    function Organisation(props) {
        var _this = _super.call(this) || this;
        _this.id = props.id || (0, uuid_1.v4)();
        _this.name = props.name;
        return _this;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)('uuid')
    ], Organisation.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Organisation.prototype, "name");
    Organisation = __decorate([
        (0, typeorm_1.Entity)()
    ], Organisation);
    return Organisation;
}(typeorm_1.BaseEntity));
exports.Organisation = Organisation;
