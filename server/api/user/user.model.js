'use strict';

import crypto from 'crypto';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
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
    github: {},
    avatar: String,
    contacts: []
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function () {
        return {
            'name': this.name,
            'role': this.role
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function () {
        return {
            '_id': this._id,
            'role': this.role
        };
    });

UserSchema
    .virtual('contactInfo')
    .get(function () {
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
UserSchema
    .path('email')
    .validate(function (email) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('password')
    .validate(function (password) {
        if (authTypes.indexOf(this.provider) !== -1) {
            return true;
        }
        return password.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function (value, respond) {
        var self = this;
        return this.constructor.findOneAsync({email: value})
            .then(function (user) {
                if (user) {
                    if (self.id === user.id) {
                        return respond(true);
                    }
                    return respond(false);
                }
                return respond(true);
            })
            .catch(function (err) {
                throw err;
            });
    }, 'The specified email address is already in use.');

var validatePresenceOf = function (value) {
    return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function (next) {
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
    authenticate: function (password, callback) {
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
            }
            else {
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
    makeSalt: function (byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
            callback = arguments[0];
            byteSize = defaultByteSize;
        }
        else if (typeof arguments[1] === 'function') {
            callback = arguments[1];
        }

        if (!byteSize) {
            byteSize = defaultByteSize;
        }

        if (!callback) {
            return crypto.randomBytes(byteSize).toString('base64');
        }

        return crypto.randomBytes(byteSize, function (err, salt) {
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
    encryptPassword: function (password, callback) {
        if (!password || !this.salt) {
            return null;
        }

        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var salt = new Buffer(this.salt, 'base64');

        if (!callback) {
            return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function (err, key) {
            if (err) {
                callback(err);
            }
            return callback(null, key.toString('base64'));
        });
    }
};

UserSchema.statics.addContact = function (id, contactId) {
    return this.findOneAsync({_id: id})
        .then(user => {
            if (user.contacts.indexOf(contactId) < 0) {
                user.contacts.push(contactId);
            }
            return user.saveAsync();
        });
};
UserSchema.statics.removeContact = function (id, contactId) {
    return this.findOneAsync({_id: id})
        .then(user => {
            let index = user.contacts.indexOf(contactId);
            if (index >= 0) {
                user.contacts.splice(index, 1);
            }
            return user.saveAsync();
        });
};

UserSchema.statics.getContacts = function(id) {
    return this.findOneAsync({_id: id})
        .then(user=> this.where('_id').in(user.contacts))
        .then(contacts=> _.map(contacts, contact=>contact.contactInfo));
};

UserSchema.statics.validateUser = function (id, token) {
    //todo: check user credentials
    return true;
}
UserSchema.statics.isConnectionAllowed = function (src, dest) {
    //todo: do proper validation
    return true;
}


//module.exports = mongoose.model('User', UserSchema);

export var User = mongoose.model('User', UserSchema)
export default User
