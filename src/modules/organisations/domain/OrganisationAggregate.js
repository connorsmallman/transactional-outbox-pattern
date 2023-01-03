"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.OrganisationAggregate = void 0;
var uuid_1 = require("uuid");
var MemberAddedEvent_1 = require("./events/MemberAddedEvent");
var OrganisationAggregate = /** @class */ (function () {
    function OrganisationAggregate(name, members, domainEvents, id) {
        if (id === void 0) { id = (0, uuid_1.v4)(); }
        this.domainEvents = [];
        this.id = id;
        this.name = name;
        this.members = members;
        this.domainEvents = domainEvents;
    }
    OrganisationAggregate.create = function (name, members, domainEvents, id) {
        if (members === void 0) { members = []; }
        if (domainEvents === void 0) { domainEvents = []; }
        return new OrganisationAggregate(name, members, domainEvents, id);
    };
    OrganisationAggregate.prototype.getName = function () {
        return this.name.value;
    };
    OrganisationAggregate.prototype.getDomainEvents = function () {
        return this.domainEvents;
    };
    OrganisationAggregate.prototype.addMember = function (member) {
        var newMembers = __spreadArray(__spreadArray([], this.members, true), [member], false);
        var newDomainEvents = __spreadArray(__spreadArray([], this.domainEvents, true), [
            new MemberAddedEvent_1.MemberAddedEvent(member),
        ], false);
        return new OrganisationAggregate(this.name, newMembers, newDomainEvents, this.id);
    };
    return OrganisationAggregate;
}());
exports.OrganisationAggregate = OrganisationAggregate;
