"use strict";
exports.__esModule = true;
exports.OrganisationCreatedEvent = void 0;
var OrganisationCreatedEvent = /** @class */ (function () {
    function OrganisationCreatedEvent(organisationId) {
        this.dateTimeOccurred = new Date();
        this.payload = organisationId;
    }
    return OrganisationCreatedEvent;
}());
exports.OrganisationCreatedEvent = OrganisationCreatedEvent;
