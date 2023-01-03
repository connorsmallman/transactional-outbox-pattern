"use strict";
exports.__esModule = true;
exports.Member = void 0;
var Member = /** @class */ (function () {
    function Member(name, id) {
        this.id = id;
        this.name = name;
    }
    Member.create = function (name, id) {
        return new Member(name, id);
    };
    return Member;
}());
exports.Member = Member;
