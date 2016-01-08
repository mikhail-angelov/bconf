'use strict';

//import app from '../..';
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
    return User.removeAsync();
  });

  beforeEach(function () {
    genUser();
  });

  afterEach(function () {
    return User.removeAsync();
  });

  it('should begin with no users', function () {
    return User.findAsync({}).should
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function () {
    return user.saveAsync()
      .then(function () {
        var userDup = genUser();
        return userDup.saveAsync();
      }).should.be.rejected;
  });

  describe('#email', function () {
    it('should fail when saving without an email', function () {
      user.email = '';
      return user.saveAsync().should.be.rejected;
    });
  });

  describe('#password', function () {
    beforeEach(function () {
      return user.saveAsync();
    });

    it('should authenticate user if valid', function () {
      user.authenticate('password').should.be.true;
    });

    it('should not authenticate user if invalid', function () {
      user.authenticate('blah').should.not.be.true;
    });

    it('should remain the same hash unless the password is updated', function () {
      user.name = 'Test User';
      return user.saveAsync()
        .spread(function (u) {
          return u.authenticate('password');
        }).should.eventually.be.true;
    });
  });

  describe('contacts', function () {
    beforeEach(function () {
      genOtherUser();
      return user.saveAsync().then(()=>{
        return otherUser.saveAsync();
      });
    });

    it('should add contact', function () {
      return User.addContact(user.id, otherUser.id)
          .then(function (u) {
            return User.getContacts(user.id);
          })
          .then(function(contacts){
            var contact = contacts[0];
            contact.name.should.be.equal('Other User');
            expect(contact.password).to.be(undefined);
            return contacts.length === 1;
          })
          .should.eventually.be.true;
    });

    it('should remove contact', function () {
      return User.addContact(user.id, otherUser.id)
          .then(function (u) {
            return User.getContacts(user.id);
          })
          .then(function(contacts){
            expect(contacts.length).to.be(1);
            return contacts;
          })
          .then(function(){
            return User.removeContact(user.id, otherUser.id);
          })
          .then(function (u) {
            return User.getContacts(user.id);
          })
          .then(function(contacts){
            expect(contacts.length).to.be(0);
            return contacts.length == 0;
          })
          .should.eventually.be.true;
    });


  });

});
