'use strict';

import User from '../user/user.model';
import _ from 'lodash';


function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        res.status(statusCode).json(err);
    }
}

function getCurrentUser(userId) {
    return User.findOneAsync({_id: userId}, '-salt -hashedPassword');
}

let getContacts = function (req, res) {

    console.log('req.user', req.user)
    var userId = req.user._id;
    var role = req.user.role;
    if (role === 'guest') {
        //todo refactor it
        let application = require('../../index.js');
        let robotMaster = application.di.robotMaster;
        let list = robotMaster.getAll();
        res.json(list);
    } else {
        User.getContacts(userId)
            .then(function (contacts) {
                res.json(contacts);
            });
    }
};
exports.index = getContacts;


exports.add = function (req, res, next) {
    let userId = req.user._id;
    let contactId = req.body.contactId;
    let invitation = req.body.invitation;
    User.addContact(userId, contactId,invitation)
        .then( ()=> getContacts(req, res))
        .catch(validationError(res));
};

exports.accept = function (req, res, next) {
    let userId = req.user._id;
    let contactId = req.body;
    User.acceptContact(userId, contactId)
        .then( ()=> res.status(200).end())
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

exports.search = function (req, res) {
    var userId = req.user._id;
    var text = req.query.text;
    User.findAsync({name:{ "$regex": text, "$options": "i" } })
        .then(function (contacts) {
            let restricted = _.map(contacts,'contactInfo')
            res.json(restricted);
        })
        .catch(validationError(res));
};