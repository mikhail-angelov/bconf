'use strict';

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _index2.default.app;

describe('User API:', function () {
  var user;

  // Clear users before testing
  before(function () {
    return _user2.default.removeAsync().then(function () {
      user = new _user2.default({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.saveAsync();
    });
  });

  // Clear users after testing
  after(function () {
    return _user2.default.removeAsync();
  });

  describe('GET /api/users/me', function () {
    var token;

    before(function (done) {
      (0, _supertest2.default)(app).post('/auth/local').send({
        email: 'test@example.com',
        password: 'password'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        token = res.body.token;
        done();
      });
    });

    it('should respond with a user profile when authenticated', function (done) {
      (0, _supertest2.default)(app).get('/api/users/me').set('authorization', 'Bearer ' + token).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        //console.log(user);
        res.body._id.toString().should.equal(user._id.toString());
        done();
      });
    });

    it('should respond with a 401 when not authenticated', function (done) {
      (0, _supertest2.default)(app).get('/api/users/me').expect(401).end(done);
    });
  });
});
//# sourceMappingURL=user.integration.js.map
