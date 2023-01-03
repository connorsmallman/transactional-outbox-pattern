"use strict";
exports.__esModule = true;
exports.UserAggregate = void 0;
var Email_1 = require("./Email");
var Password_1 = require("./Password");
var Name_1 = require("./Name");
var uuid_1 = require("uuid");
var UserAggregate = /** @class */ (function () {
    function UserAggregate(name, email, password, domainEvents, id) {
        this.domainEvents = [];
        this.id = id || (0, uuid_1.v4)();
        this.name = name;
        this.email = email;
        this.password = password;
        this.domainEvents = domainEvents;
    }
    UserAggregate.prototype.getName = function () {
        return this.name.getValue();
    };
    UserAggregate.prototype.getEmail = function () {
        return this.email.getValue();
    };
    UserAggregate.prototype.getPassword = function () {
        return this.password.getValue();
    };
    UserAggregate.prototype.getDeIdentifiedUser = function () {
        return {
            id: this.id,
            name: this.name.getKey(),
            email: this.email.getKey(),
            password: this.password.getKey()
        };
    };
    UserAggregate.prototype.getDomainEvents = function () {
        return this.domainEvents;
    };
    UserAggregate.create = function (rawName, rawEmail, rawPassword, domainEvents, id) {
        if (domainEvents === void 0) { domainEvents = []; }
        var name = new Name_1.Name(rawName);
        var email = new Email_1.Email(rawEmail);
        var password = new Password_1.Password(rawPassword);
        return new UserAggregate(name, email, password, domainEvents, id);
    };
    return UserAggregate;
}());
exports.UserAggregate = UserAggregate;
