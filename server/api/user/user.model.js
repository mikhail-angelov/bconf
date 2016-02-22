'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authTypes = ['github', 'twitter', 'facebook', 'google'];
var _ = require('lodash');

var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    google: {},
    yandex: {},
    github: {},
    avatar: String,
    contacts: []
});

var contactStatus = {
    BUDDY: 'buddy',
    BOT: 'bot',
    REQUEST: 'request',
    PENDING: 'pending'
};

/**
 * Virtuals
 */

// Public profile information
UserSchema.virtual('profile').get(function () {
    return {
        'name': this.name,
        'role': this.role
    };
});

// Non-sensitive info we'll be putting in the token
UserSchema.virtual('token').get(function () {
    return {
        '_id': this._id,
        'role': this.role
    };
});

UserSchema.virtual('contactInfo').get(function () {
    return {
        '_id': this._id,
        'name': this.name,
        'email': this.email,
        'avatar': this.avatar
    };
});

/**
 * Validations
 */

// Validate empty email
UserSchema.path('email').validate(function (email) {
    if (authTypes.indexOf(this.provider) !== -1) {
        return true;
    }
    return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema.path('password').validate(function (password) {
    if (authTypes.indexOf(this.provider) !== -1) {
        return true;
    }
    return password.length;
}, 'Password cannot be blank');

// Validate email is not taken
UserSchema.path('email').validate(function (value, respond) {
    var self = this;
    return this.constructor.findOne({ email: value }).then(function (user) {
        if (user) {
            if (self.id === user.id) {
                return respond(true);
            }
            return respond(false);
        }
        return respond(true);
    });
    //.catch(function (err) {
    //    throw err;
    //});
}, 'The specified email address is already in use.');

var validatePresenceOf = function validatePresenceOf(value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    // Handle new/update passwords
    if (this.isModified('password')) {
        if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1) {
            next(new Error('Invalid password'));
        }

        // Make salt with a callback
        var _this = this;
        this.makeSalt(function (saltErr, salt) {
            if (saltErr) {
                next(saltErr);
            }
            _this.salt = salt;
            _this.encryptPassword(_this.password, function (encryptErr, hashedPassword) {
                if (encryptErr) {
                    next(encryptErr);
                }
                _this.password = hashedPassword;
                next();
            });
        });
    } else {
        next();
    }
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @param {Function} callback
     * @return {Boolean}
     * @api public
     */
    authenticate: function authenticate(password, callback) {
        if (!callback) {
            return this.password === this.encryptPassword(password);
        }

        var _this = this;
        this.encryptPassword(password, function (err, pwdGen) {
            if (err) {
                callback(err);
            }

            if (_this.password === pwdGen) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    },

    /**
     * Make salt
     *
     * @param {Number} byteSize Optional salt byte size, default to 16
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    makeSalt: function makeSalt(byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
        } else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            return _crypto2.default.randomBytes(byteSize).toString('base64');
        }

        return _crypto2.default.randomBytes(byteSize, function (err, salt) {
            if (err) {
                callback(err);
            }
            return callback(null, salt.toString('base64'));
        });
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @param {Function} callback
     * @return {String}
     * @api public
     */
    encryptPassword: function encryptPassword(password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return _crypto2.default.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength).toString('base64');
        }

        return _crypto2.default.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function (err, key) {
            if (err) {
                callback(err);
            }
            return callback(null, key.toString('base64'));
        });
    }
};

UserSchema.statics.addContact = function (id, contactId, invitation) {
    var _this2 = this;

    var owner = undefined;
    var userToAdd = undefined;

    return this.findById(id).then(function (user) {
        owner = user;
        if (_.findIndex(owner.contacts, { id: contactId }) < 0) {
            var contacts = owner.contacts.push({ id: contactId, status: contactStatus.PENDING });
            return owner.save();
        }
    }).then(function () {
        return _this2.findById(contactId);
    }).then(function (user) {
        userToAdd = user;
        if (_.findIndex(userToAdd.contacts, { id: id }) < 0) {
            var contacts = userToAdd.contacts.push({ id: id, status: contactStatus.REQUEST, invitation: invitation });
            return userToAdd.save();
        }
    });
};

UserSchema.statics.acceptContact = function (userId, contactId) {
    var _this3 = this;

    return this.findById(userId).then(function (owner) {
        var contactIndex = _.findIndex(owner.contacts, { id: contactId });
        console.log('get1 ', owner, contactIndex);
        if (contactIndex >= 0 && owner.contacts[contactIndex].status === contactStatus.REQUEST) {
            owner.contacts[contactIndex].status = contactStatus.BUDDY;
            owner.contacts = _.clone(owner.contacts);
            console.log('get2 ', owner);

            return _this3.update({ "_id": userId, "contacts.id": contactId }, { "$set": { "contacts.$.status": contactStatus.BUDDY } });
            //return owner.save();
        } else {
                return false;
            }
    }).then(function (process) {
        console.log('get3 ', process);
        return process ? _this3.findById(contactId) : process;
    }).then(function (userToAdd) {
        if (userToAdd) {
            var contactIndex = _.findIndex(userToAdd.contacts, { id: userId });
            if (contactIndex >= 0) {
                //userToAdd.contacts[contactIndex].status = contactStatus.BUDDY;

                //var item =  userToAdd.contacts.id(userId);
                //item.status = contactStatus.BUDDY;

                console.log('get4 ', userToAdd);

                return _this3.update({ "_id": contactId, "contacts.id": userId }, { "$set": { "contacts.$.status": contactStatus.BUDDY } });

                //   return userToAdd.save();
            }
        }
    }).then(function (u) {
        console.log('get5 ', u);
        return _this3.find();
    }).then(function (u) {
        console.log('get6 ', u);
        return u;
    });
};

UserSchema.statics.removeContact = function (id, contactId) {
    console.log('remove', id, contactId);
    return this.findOne({ _id: id }).then(function (user) {
        var index = _.findIndex(user.contacts, { id: contactId });
        if (index >= 0) {
            user.contacts.splice(index, 1);
        }
        return user.save();
    });
};

UserSchema.statics.getContacts = function (id) {
    var _this4 = this;

    var result = [];
    return this.findOne({ _id: id }).then(function (user) {
        result = user.contacts;
        var ids = _.map(user.contacts, 'id');
        return _this4.where('_id').in(ids);
    }).then(function (contacts) {
        var infos = _.reduce(contacts, function (acc, contact) {
            acc[contact._id.toString()] = contact.contactInfo;
            return acc;
        }, {});
        console.log(infos);
        return _.map(result, function (item) {
            return _.extend(item, infos[item.id]);
        });
    });
};

UserSchema.statics.validateUser = function (id, token) {
    //todo: check user credentials
    return true;
};
UserSchema.statics.isConnectionAllowed = function (src, dest) {
    //todo: do proper validation
    return true;
};

//module.exports = mongoose.model('User', UserSchema);

var User = exports.User = mongoose.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map
