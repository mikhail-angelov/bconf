'use strict';

import User from '../user/user.model';


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
    getCurrentUser(userId)
        .then(user => {
            user.getContacts(userId)
                .then(function (contacts) {
                    res.json(contacts);
                });
        });
};


exports.add = function (req, res, next) {
    var userId = req.user._id;
    var contactId = req.body;
    User.addContact(userId, contactId)
        .then(function () {
            res.status(201).end();
        })
        .catch(validationError(res));
};


exports.update = function (req, res, next) {
    var userId = req.params.id;

    //todo: not implemented
    res.status(204).end();
};

exports.destroy = function (req, res) {
    var userId = req.user._id;
    var contactId = req.body;
    User.removeContact(userId, contactId)
        .then(function () {
            res.status(201).end();
        })
        .catch(validationError(res));
};


exports.createGuest = function (req, res, next) {
    var newUser = new User(req.body);
    var userId = req.user._id;
    newUser.provider = 'local';
    newUser.role = 'guest';
    newUser.owner = userId;
    newUser.saveAsync()
        .spread(function (user) {
            res.json(user);
        })
        .catch(validationError(res));
};