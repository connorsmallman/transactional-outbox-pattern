"use strict";
exports.__esModule = true;
exports.MemberAddedEvent = void 0;
var MemberAddedEvent = /** @class */ (function () {
    function MemberAddedEvent(member) {
        this.dateTimeOccurred = new Date();
        this.payload = member;
    }
    return MemberAddedEvent;
}());
exports.MemberAddedEvent = MemberAddedEvent;
