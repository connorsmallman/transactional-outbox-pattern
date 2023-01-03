"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserUseCase = void 0;
var common_1 = require("@nestjs/common");
var UserFactory_1 = require("../domain/UserFactory");
var FailedToCreateUserError_1 = require("../domain/errors/FailedToCreateUserError");
var fp_ts_1 = require("fp-ts");
var function_1 = require("fp-ts/function");
var CreateUserUseCase = /** @class */ (function () {
    function CreateUserUseCase(userRepository) {
        this.userRepository = userRepository;
    }
    CreateUserUseCase.prototype.execute = function (userDTO) {
        var _this = this;
        return (0, function_1.pipe)(fp_ts_1.taskEither.of(UserFactory_1.UserFactory.createNewUser(userDTO.name, userDTO.email, userDTO.password)), fp_ts_1.taskEither.chain(function (user) { return _this.userRepository.save(user); }), fp_ts_1.taskEither.mapLeft(function (error) {
            return new FailedToCreateUserError_1.FailedToCreateUserError(error.message);
        }), fp_ts_1.taskEither.map(function () { return undefined; }));
    };
    CreateUserUseCase = __decorate([
        (0, common_1.Injectable)()
    ], CreateUserUseCase);
    return CreateUserUseCase;
}());
exports.CreateUserUseCase = CreateUserUseCase;
