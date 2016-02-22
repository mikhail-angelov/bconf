'use strict';

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

var getContacts = function getContacts(req, res) {

    console.log('req.user', req.user);
    var userId = req.user._id;
    var role = req.user.role;
    if (role === 'guest') {
        //todo refactor it
        var application = require('../../index.js');
        var robotMaster = application.di.robotMaster;
        var list = robotMaster.getAll();
        res.json(list);
    } else {
        _user2.default.getContacts(userId).then(function (contacts) {
            res.json(contacts);
        });
    }
};
exports.index = getContacts;

exports.add = function (req, res, next) {
    var userId = req.user._id;
    var contactId = req.body.contactId;
    var invitation = req.body.invitation;
    _user2.default.addContact(userId, contactId, invitation).then(function () {
        return getContacts(req, res);
    }).catch(validationError(res));
};

exports.accept = function (req, res, next) {
    var userId = req.user._id;
    var contactId = req.body;
    _user2.default.acceptContact(userId, contactId).then(function () {
        return res.status(200).end();
    }).catch(validationError(res));
};

exports.update = function (req, res, next) {
    var userId = req.params.id;

    //todo: not implemented
    res.status(204).end();
};

exports.destroy = function (req, res) {
    var userId = req.user._id;
    var contactId = req.body;
    _user2.default.removeContact(userId, contactId).then(function () {
        res.status(201).end();
    }).catch(validationError(res));
};

exports.createGuest = function (req, res, next) {
    var newUser = new _user2.default(req.body);
    var userId = req.user._id;
    newUser.provider = 'local';
    newUser.role = 'guest';
    newUser.owner = userId;
    newUser.saveAsync().spread(function (user) {
        res.json(user);
    }).catch(validationError(res));
};

exports.search = function (req, res) {
    var userId = req.user._id;
    var text = req.query.text;
    _user2.default.findAsync({ name: { "$regex": text, "$options": "i" } }).then(function (contacts) {
        var restricted = _lodash2.default.map(contacts, 'contactInfo');
        res.json(restricted);
    }).catch(validationError(res));
};
//# sourceMappingURL=contact.controller.js.map
