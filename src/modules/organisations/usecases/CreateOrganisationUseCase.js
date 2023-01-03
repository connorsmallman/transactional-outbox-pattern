"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateOrganisationUseCase = void 0;
var common_1 = require("@nestjs/common");
var OrganisationFactory_1 = require("../domain/OrganisationFactory");
var fp_ts_1 = require("fp-ts");
var FailedToCreateOrganisationError_1 = require("../domain/errors/FailedToCreateOrganisationError");
var function_1 = require("fp-ts/function");
var CreateOrganisationUseCase = /** @class */ (function () {
    function CreateOrganisationUseCase(organisationRepository) {
        this.organisationRepository = organisationRepository;
    }
    CreateOrganisationUseCase.prototype.execute = function (createOrganisationDTO) {
        var _this = this;
        return (0, function_1.pipe)(fp_ts_1.taskEither.of(OrganisationFactory_1.OrganisationFactory.createNewOrganisation(createOrganisationDTO.name)), fp_ts_1.taskEither.chain(function (organisation) {
            return _this.organisationRepository.save(organisation);
        }), fp_ts_1.taskEither.mapLeft(function (error) {
            return new FailedToCreateOrganisationError_1.FailedToCreateOrganisationError(error.message);
        }), fp_ts_1.taskEither.map(function () { return undefined; }));
    };
    CreateOrganisationUseCase = __decorate([
        (0, common_1.Injectable)()
    ], CreateOrganisationUseCase);
    return CreateOrganisationUseCase;
}());
exports.CreateOrganisationUseCase = CreateOrganisationUseCase;
