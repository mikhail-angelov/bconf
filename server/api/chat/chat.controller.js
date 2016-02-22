'use strict';

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _chat = require('./chat.model');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        res.status(statusCode).json(err);
    };
}

function getCurrentUser(userId) {
    return _user2.default.findOneAsync({ _id: userId }, '-salt -hashedPassword');
}

exports.index = function (req, res) {
    var userId = req.user._id;
    _chat2.default.getUserChats(userId).then(function (chats) {
        res.json(chats);
    });
};

exports.create = function (req, res, next) {
    var userId = req.user._id;
    var chat = req.body;
    _chat2.default.create(userId, chat).then(function (newChat) {
        res.json(newChat);
    }).catch(validationError(res));
};

exports.remove = function (req, res) {
    var userId = req.user._id;
    var chatId = req.params.chatId;
    _chat2.default.removeChatUser(chatId, userId).then(function () {
        res.status(204).end();
    }).catch(validationError(res));
};

exports.removeUser = function (req, res) {
    var userId = req.user._id;
    var chatId = req.params.chatId;
    var chatUserId = req.params.userId;
    _chat2.default.removeChatUser(chatId, chatUserId).then(function () {
        res.status(204).end();
    }).catch(validationError(res));
};

exports.addUser = function (req, res) {
    var userId = req.user._id;
    var chatId = req.params.chatId;
    var chatUserId = req.params.userId;
    _chat2.default.addChatUser(chatId, chatUserId).then(function () {
        res.status(201).end();
    }).catch(validationError(res));
};
//# sourceMappingURL=chat.controller.js.map
