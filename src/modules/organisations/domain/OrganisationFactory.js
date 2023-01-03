"use strict";
exports.__esModule = true;
exports.OrganisationFactory = void 0;
var OrganisationAggregate_1 = require("./OrganisationAggregate");
var OrganisationCreatedEvent_1 = require("./events/OrganisationCreatedEvent");
var uuid_1 = require("uuid");
var OrganisationName_1 = require("./OrganisationName");
var OrganisationFactory = /** @class */ (function () {
    function OrganisationFactory() {
    }
    OrganisationFactory.createNewOrganisation = function (rawName) {
        var organisationId = (0, uuid_1.v4)();
        var name = new OrganisationName_1.OrganisationName(rawName);
        return new OrganisationAggregate_1.OrganisationAggregate(name, [], [new OrganisationCreatedEvent_1.OrganisationCreatedEvent(organisationId)], organisationId);
    };
    return OrganisationFactory;
}());
exports.OrganisationFactory = OrganisationFactory;
