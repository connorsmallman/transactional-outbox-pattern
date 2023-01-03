"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.OutboxSubscriber = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var Outbox_1 = require("../entities/Outbox");
var OutboxSubscriber = /** @class */ (function () {
    function OutboxSubscriber(datasource, eventEmitter) {
        this.datasource = datasource;
        this.eventEmitter = eventEmitter;
        datasource.subscribers.push(this);
    }
    OutboxSubscriber.prototype.listenTo = function () {
        return Outbox_1.Outbox;
    };
    OutboxSubscriber.prototype.afterInsert = function (event) {
        // We emit the event here to prevent blocking
        this.eventEmitter.emit(event.entity.name, event.entity);
    };
    OutboxSubscriber = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectDataSource)())
    ], OutboxSubscriber);
    return OutboxSubscriber;
}());
exports.OutboxSubscriber = OutboxSubscriber;
