"use strict";
exports.__esModule = true;
exports.UserCreatedEvent = void 0;
var UserCreatedEvent = /** @class */ (function () {
    function UserCreatedEvent(userId) {
        this.name = 'UserCreatedEvent';
        this.payload = userId;
        this.dateTimeOccurred = new Date();
    }
    return UserCreatedEvent;
}());
exports.UserCreatedEvent = UserCreatedEvent;
