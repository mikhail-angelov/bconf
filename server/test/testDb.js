'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../api/user/user.model');

var testDb = {
    init: function init() {
        var user = new _user.User({
            provider: 'local',
            name: 'Fake User',
            email: 'test@example.com',
            password: 'password'
        });
        return user.saveAsync().then(function (data) {
            testDb.user = data[0];
            var otherUser = new _user.User({
                provider: 'local',
                name: 'Other User',
                email: 'other@example.com',
                password: 'password'
            });
            return otherUser.saveAsync();
        }).then(function (data) {
            testDb.otherUser = data[0];
            return testDb;
        });
    },
    reset: function reset() {
        _user.User.removeAsync();
    },
    user: null,
    otherUser: null

};

exports.default = testDb;
//# sourceMappingURL=testDb.js.map
