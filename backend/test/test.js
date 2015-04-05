var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config');
var User = require('./user');

describe('Routing', function () {
  var url = 'http://localhost:3000';
  var fakeUserId = null;
  var sharedToken = null;
  var guestId = null;

  before(function (done) {
    // In our tests we use the test db
    mongoose.connect(config.MONGO_DB);
    User.createUser({
      lastName: 'test',
      firstName: 'test',
      providerId: 'yandex',
      email: 'test',
      provider: 'yandex',
      displayName: 'test',
      providerToken: 'test'
    }).then(function (user) {
      fakeUserId = user.id;
      sharedToken = user.sharedToken;
      done();
    });
  });

  it('should return user info of existing user', function (done) {
    request(url)
      .get('/user/' + fakeUserId)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        console.log(res.body);
        res.body.should.have.property('id');
        res.body.firstName.should.equal('test');
        res.body.lastName.should.equal('test');
        res.body.id.should.equal(fakeUserId);
        done();
      });
  });

  it('should return new guests user info if refer exist', function (done) {
    var data = {refer: fakeUserId, sharedToken: sharedToken};
    request(url)
      .post('/user/createGuest')
      .send(data)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        console.log(res.body);
        res.body.should.have.property('id');
        res.body.displayName.should.equal('guest');
        res.body.friends[0].should.equal(fakeUserId);
        guestId = res.body.id;
        done();
      });
  });

  it('should return one friend for user', function (done) {
    var data = {refer: fakeUserId, sharedToken: sharedToken};
    request(url)
      .get('/user/'+fakeUserId+'/friends')
      .send(data)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        console.log(res.body);
        res.body.length.should.equal(1);
        res.body[0].displayName.should.equal('guest');
        res.body[0].friends[0].should.equal(fakeUserId);
        done();
      });
  });

  after(function (done) {
    if (guestId) {
      User.findOneAndRemove({id: guestId}, function (err) {
        console.log('on remove ' + err);
        done();
      });
    }
    User.findOneAndRemove({id: fakeUserId}, function (err) {
      console.log('on remove ' + err);
      done();
    });

  });
});
