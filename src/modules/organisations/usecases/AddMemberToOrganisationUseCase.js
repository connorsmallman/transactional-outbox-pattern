"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddMemberToOrganisationUseCase = void 0;
var common_1 = require("@nestjs/common");
var Member_1 = require("../domain/Member");
var FailedToAddMemberToOrganisationError_1 = require("../domain/errors/FailedToAddMemberToOrganisationError");
var fp_ts_1 = require("fp-ts");
var function_1 = require("fp-ts/function");
var AddMemberToOrganisationUseCase = /** @class */ (function () {
    function AddMemberToOrganisationUseCase(organisationRepository) {
        this.organisationRepository = organisationRepository;
    }
    AddMemberToOrganisationUseCase.prototype.execute = function (addMemberToOrganisationDTO) {
        var _this = this;
        return (0, function_1.pipe)(this.organisationRepository.findById(addMemberToOrganisationDTO.organisationId), fp_ts_1.taskEither.map(function (organisation) {
            var member = Member_1.Member.create(addMemberToOrganisationDTO.member.name, addMemberToOrganisationDTO.member.id);
            return organisation.addMember(member);
        }), fp_ts_1.taskEither.chain(function (organisation) {
            return _this.organisationRepository.save(organisation);
        }), fp_ts_1.taskEither.map(function (organisation) { return ({
            organisationId: organisation.id
        }); }), fp_ts_1.taskEither.mapLeft(function (error) {
            return new FailedToAddMemberToOrganisationError_1.FailedToAddMemberToOrganisationError(error.message);
        }));
    };
    AddMemberToOrganisationUseCase = __decorate([
        (0, common_1.Injectable)()
    ], AddMemberToOrganisationUseCase);
    return AddMemberToOrganisationUseCase;
}());
exports.AddMemberToOrganisationUseCase = AddMemberToOrganisationUseCase;
