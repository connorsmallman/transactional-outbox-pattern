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
exports.Outbox = void 0;
var typeorm_1 = require("typeorm");
var Outbox = /** @class */ (function (_super) {
    __extends(Outbox, _super);
    function Outbox(props) {
        var _this = _super.call(this) || this;
        _this.id = props.id;
        _this.name = props.name;
        _this.timestamp = props.timestamp;
        _this.payload = props.payload;
        return _this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Outbox.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Outbox.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Outbox.prototype, "timestamp");
    __decorate([
        (0, typeorm_1.Column)('json')
    ], Outbox.prototype, "payload");
    Outbox = __decorate([
        (0, typeorm_1.Entity)()
    ], Outbox);
    return Outbox;
}(typeorm_1.BaseEntity));
exports.Outbox = Outbox;
