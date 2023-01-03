"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var common_1 = require("@nestjs/common");
var UsersController_1 = require("./infrastructure/http/UsersController");
var CreateUserUseCase_1 = require("./usecases/CreateUserUseCase");
var UserRepository_1 = require("./domain/UserRepository");
var GetUserUseCase_1 = require("./usecases/GetUserUseCase");
var UserFactory_1 = require("./domain/UserFactory");
var IdentificationLookupService_1 = require("./services/IdentificationLookupService");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [],
            controllers: [UsersController_1.UsersController],
            providers: [
                CreateUserUseCase_1.CreateUserUseCase,
                GetUserUseCase_1.GetUserUseCase,
                UserFactory_1.UserFactory,
                IdentificationLookupService_1.IdentificationLookupService,
                UserRepository_1.UserRepository,
            ]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
