'use strict';

var _chat = require('./chat.model');

var _user = require('../user/user.model');

var _testDb = require('../../test/testDb.js');

var _testDb2 = _interopRequireDefault(_testDb);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Chat Model', function () {
    before(function () {
        return _chat.Chat.removeAsync();
    });

    beforeEach(function () {
        return _testDb2.default.init().then(function (db) {
            expect(!!_testDb2.default.user._id).to.be(true);
        });
    });

    afterEach(function () {
        _chat.Chat.removeAsync();
        return _testDb2.default.reset();
    });

    it('should begin with users', function () {
        var user = _testDb2.default.user;
        return _user.User.findAsync({ _id: user._id }).should.eventually.have.length(1);
    });

    it('should create chat', function (done) {
        var chat = {
            name: 'test',
            list: [_testDb2.default.user._id, _testDb2.default.otherUser._id]
        };
        return _chat.Chat.create(chat).then(function () {
            return _chat.Chat.getUserChats(_testDb2.default.user._id);
        }).then(function (chatRecords) {
            var chatRecord = [];
            _lodash2.default.forIn(chatRecords, function (value, key) {
                chatRecord.push(value);
            });
            expect(chatRecord[0].name).to.be('test');
            expect(!!chatRecord[0].chatId).to.be(true);
            expect(chatRecord[0].list.length).to.be(2);
            expect(chatRecord[0].list[0]).to.be(_testDb2.default.user._id.toString());

            done();
        });
    });

    it('should add/remove chat user', function (done) {
        var chat = {
            name: 'test',
            list: [_testDb2.default.user._id]
        };
        var chatId;
        return _chat.Chat.create(chat).then(function () {
            return _chat.Chat.getUserChats(_testDb2.default.user._id);
        }).then(function (chatRecords) {
            var chatRecord = [];
            _lodash2.default.forIn(chatRecords, function (value, key) {
                chatRecord.push(value);
            });
            chatId = chatRecord[0].chatId;
            expect(chatRecord[0].list.length).to.be(1);
        }).then(function () {
            return _chat.Chat.addChatUser(chatId, _testDb2.default.otherUser._id);
        }).then(function () {
            return _chat.Chat.getUserChats(_testDb2.default.otherUser._id);
        }).then(function (chatRecords) {
            var chatRecord = [];
            _lodash2.default.forIn(chatRecords, function (value, key) {
                chatRecord.push(value);
            });
            expect(chatRecord[0].list.length).to.be(2);
        }).then(function () {
            return _chat.Chat.removeChatUser(chatId, _testDb2.default.user._id);
        }).then(function () {
            return _chat.Chat.getUserChats(_testDb2.default.otherUser._id);
        }).then(function (chatRecords) {
            var chatRecord = [];
            _lodash2.default.forIn(chatRecords, function (value, key) {
                chatRecord.push(value);
            });
            expect(chatRecord[0].list.length).to.be(1);

            done();
        });
    });
});
//# sourceMappingURL=chat.model.spec.js.map
