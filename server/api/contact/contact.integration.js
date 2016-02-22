'use strict';

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _testDb = require('../../test/testDb.js');

var _testDb2 = _interopRequireDefault(_testDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _index2.default.app;

describe('Contact API:', function () {

    // Clear users before testing
    before(function () {
        return _testDb2.default.init().then(function () {
            return _user2.default.addContact(_testDb2.default.user._id, _testDb2.default.otherUser._id);
        }).then(function () {
            console.log('users are added');
            return _user2.default.findOneAsync({ email: 'test@example.com' }).then(function (user) {
                return console.log('user', user);
            });
        });
    });

    // Clear users after testing
    after(function () {
        return _testDb2.default.reset();
    });

    describe('GET /api/contacts', function () {
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

        it('should respond with list of contacts when authenticated', function (done) {
            (0, _supertest2.default)(app).get('/api/contacts').set('authorization', 'Bearer ' + token).expect(200).expect('Content-Type', /json/).end(function (err, res) {
                var contacts = res.body;
                contacts.length.should.be.equal(1);
                contacts[0]._id.toString().should.be.equal(_testDb2.default.otherUser._id.toString());
                done();
            });
        });

        it('should respond with a 401 when not authenticated', function (done) {
            (0, _supertest2.default)(app).get('/api/contacts').expect(401).end(done);
        });

        it('should find list of contacts when authenticated', function (done) {
            (0, _supertest2.default)(app).get('/api/contacts/search?text=Other').set('authorization', 'Bearer ' + token).expect(200).expect('Content-Type', /json/).end(function (err, res) {
                var contacts = res.body;
                contacts.length.should.be.equal(1);
                contacts[0]._id.toString().should.be.equal(_testDb2.default.otherUser._id.toString());
                done();
            });
        });

        describe('guest request', function (done) {
            var guestToken;

            before(function (done) {
                (0, _supertest2.default)(app).post('/auth/local/guest').send({}).expect(200).expect('Content-Type', /json/).end(function (err, res) {
                    guestToken = res.body.token;
                    done();
                });
            });

            it('should respond with list of robots for guest', function (done) {
                (0, _supertest2.default)(app).get('/api/contacts').set('authorization', 'Bearer ' + guestToken).expect(200).expect('Content-Type', /json/).end(function (err, res) {
                    var contacts = res.body;
                    console.log('contacts', contacts);
                    contacts.length.should.be.gt(1);
                    contacts[0].name.toString().should.be.equal('Echo');
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=contact.integration.js.map
