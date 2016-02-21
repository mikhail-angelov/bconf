'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

import { User}  from './user.model';
var user;
var otherUser;
var genUser = function () {
    user = new User({
        provider: 'local',
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
    });

    return user;
};
var genOtherUser = function () {
    otherUser = new User({
        provider: 'local',
        name: 'Other User',
        email: 'other@example.com',
        password: 'password'
    });

    return otherUser;
};

describe('User Model', function () {
    before(function () {
        // Clear users before testing
        return User.remove();
    });

    beforeEach(function () {
        genUser();
    });

    afterEach(function () {
        return User.remove();
    });

    it('should begin with no users', function () {
        return User.find({}).should
            .eventually.have.length(0);
    });

    it('should fail when saving a duplicate user', function () {
        return user.save()
            .then(function () {
                var userDup = genUser();
                return userDup.save();
            }).should.be.rejected;
    });

    describe('#email', function () {
        it('should fail when saving without an email', function () {
            user.email = '';
            return user.save().should.be.rejected;
        });
    });

    describe('#password', function () {
        beforeEach(function () {
            return user.save();
        });

        it('should authenticate user if valid', function () {
            user.authenticate('password').should.be.true;
        });

        it('should not authenticate user if invalid', function () {
            user.authenticate('blah').should.not.be.true;
        });

        it('should remain the same hash unless the password is updated', function () {
            user.name = 'Test User';
            return user.save()
                .then(function (u) {
                    return u.authenticate('password');
                }).should.eventually.be.true;
        });
    });

    describe('contacts', function () {
        beforeEach(function () {
            genOtherUser();
            return user.save().then(()=> {
                return otherUser.save();
            });
        });

        it('should add contact', function () {
            return User.addContact(user.id, otherUser.id)
                .then(function (u) {
                    return User.getContacts(user.id);
                })
                .then(function (contacts) {
                    var contact = contacts[0];
                    contact.name.should.be.equal('Other User');
                    expect(contact.password).to.be(undefined);
                    return contacts.length === 1;
                })
                .should.eventually.be.true;
        });

        it('should remove contact', function () {
            return User.addContact(user.id, otherUser.id, 'test')
                .then(function (u) {
                    return User.getContacts(user.id);
                })
                .then(function (contacts) {
                    expect(contacts.length).to.be(1);
                    return contacts;
                })
                .then(function () {
                    return User.removeContact(user.id, otherUser.id);
                })
                .then(function (u) {
                    return User.getContacts(user.id);
                })
                .then(function (contacts) {
                    expect(contacts.length).to.be(0);
                    return contacts.length == 0;
                })
                .should.eventually.be.true;
        });

        it('should accept contact', function () {
            return User.addContact(user.id, otherUser.id, 'test')
                .then(function (u) {
                    return User.getContacts(user.id);
                })
                .then(function (contacts) {
                    expect(contacts.length).to.be(1);
                    expect(contacts[0].status).to.be('pending');
                    expect(contacts[0].id).to.be(otherUser.id);
                    return contacts;
                })
                .then(function () {
                    return User.acceptContact(otherUser.id, user.id);
                })
                .then(function (u) {
                    console.log('t1  ', u)
                    return User.getContacts(user.id);
                })
                .then(function (contacts) {
                    console.log('t2 ', contacts, user.id)
                    expect(contacts.length).to.be(1);
                    expect(contacts[0].status).to.be('buddy');
                    return contacts.length == 1;
                })
                .should.eventually.be.true;
        });


    });

});
