'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chat = undefined;

var _index = require('../../components/util/index');

var _index2 = _interopRequireDefault(_index);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    name: String,
    chatId: String,
    userId: String
});

ChatSchema.statics.create = function (chat) {
    var chatId = _index2.default.randomId();
    var chats = _lodash2.default.map(chat.list, function (userId) {
        return {
            name: chat.name,
            userId: userId.toString(),
            chatId: chatId
        };
    });
    console.log('chats', chats);

    var deferred = _q2.default.defer();
    this.collection.insert(chats, function onInsert(err, docs) {
        if (err) {
            console.log('error', err);
            deferred.reject(err);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
};

ChatSchema.statics.getUserChats = function (userId) {
    var _this = this;

    return this.findAsync({ userId: userId.toString() }).then(function (chats) {
        var chatIds = _lodash2.default.map(chats, function (chat) {
            return chat.chatId;
        });
        return _this.findAsync({ 'chatId': { $in: chatIds } });
    }).then(function (chats) {
        return _lodash2.default.reduce(chats, function (acc, chat) {
            var chatId = chat.chatId;
            acc[chatId] = acc[chatId] || {};
            acc[chatId].name = chat.name;
            acc[chatId].chatId = chatId;
            acc[chatId].list = acc[chatId].list || [];
            acc[chatId].list.push(chat.userId);
            return acc;
        }, {});
    });
};

ChatSchema.statics.addChatUser = function (chatId, userId) {
    return this.findAsync({ chatId: chatId }).then(function (chats) {
        if (!chats || chats.length == 0 || _lodash2.default.find(chats, { userId: userId })) return null;else {
            var newChat = new Chat({
                chatId: chatId.toString(),
                name: chats[0].name,
                userId: userId.toString()
            });
            return newChat.saveAsync();
        }
    });
};

ChatSchema.statics.removeChatUser = function (chatId, userId) {
    return this.findOneAndRemoveAsync({ chatId: chatId.toString(), userId: userId.toString() });
};

var Chat = exports.Chat = mongoose.model('Chat', ChatSchema);
exports.default = Chat;
//# sourceMappingURL=chat.model.js.map
