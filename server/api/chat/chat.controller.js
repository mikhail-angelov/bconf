'use strict';

import User from '../user/user.model';
import Chat from './chat.model';


function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        res.status(statusCode).json(err);
    }
}

function getCurrentUser(userId) {
    return User.findOneAsync({_id: userId}, '-salt -hashedPassword');
}

exports.index = function (req, res) {
    var userId = req.user._id;
    Chat.getUserChats(userId)
        .then(chats => {
                    res.json(chats);
        });
};


exports.create = function (req, res, next) {
    var userId = req.user._id;
    var chat = req.body;
    Chat.create(userId, chat)
        .then(function (newChat) {
            res.json(newChat);
        })
        .catch(validationError(res));
};

exports.remove = function (req, res) {
    var userId = req.user._id;
    var chatId = req.params.chatId;
    Chat.removeChatUser(chatId,userId)
        .then(function () {
            res.status(204).end();
        })
        .catch(validationError(res));
};


exports.removeUser = function (req, res) {
    var userId = req.user._id;
    var chatId = req.params.chatId;
    var chatUserId = req.params.userId;
    Chat.removeChatUser(chatId,chatUserId)
        .then(function () {
            res.status(204).end();
        })
        .catch(validationError(res));
};

exports.addUser = function (req, res) {
    var userId = req.user._id;
    var chatId = req.params.chatId;
    var chatUserId = req.params.userId;
    Chat.addChatUser(chatId,chatUserId)
        .then(function () {
            res.status(201).end();
        })
        .catch(validationError(res));
};