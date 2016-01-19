'use strict';

import application from '../../index';
import User from '../user/user.model';
import request from 'supertest';
import testDb from '../../test/testDb.js'

let app = application.app;

describe('Contact API:', function () {

    // Clear users before testing
    before(function () {
        return testDb.init()
            .then(()=>User.addContact(testDb.user._id, testDb.otherUser._id))
            .then(()=> {
                console.log('users are added')
                return User.findOneAsync({email: 'test@example.com'})
                    .then(user=>console.log('user', user))
            });

    });

    // Clear users after testing
    after(function () {
        return testDb.reset();
    });

    describe('GET /api/contacts', function () {
        var token;

        before(function (done) {
            request(app)
                .post('/auth/local')
                .send({
                    email: 'test@example.com',
                    password: 'password'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    token = res.body.token;
                    done();
                });
        });

        it('should respond with list of contacts when authenticated', function (done) {
            request(app)
                .get('/api/contacts')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    var contacts = res.body;
                    contacts.length.should.be.equal(1);
                    contacts[0]._id.toString().should.be.equal(testDb.otherUser._id.toString());
                    done();
                });
        });

        it('should respond with a 401 when not authenticated', function (done) {
            request(app)
                .get('/api/contacts')
                .expect(401)
                .end(done);
        });

        it('should find list of contacts when authenticated', function (done) {
            request(app)
                .get('/api/contacts/search?text=Other')
                .set('authorization', 'Bearer ' + token)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    var contacts = res.body;
                    contacts.length.should.be.equal(1);
                    contacts[0]._id.toString().should.be.equal(testDb.otherUser._id.toString());
                    done();
                });
        });

        describe('guest request', function (done) {
            var guestToken;

            before(function (done) {
                request(app)
                    .post('/auth/local/guest')
                    .send({})
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        guestToken = res.body.token;
                        done();
                    });
            });


            it('should respond with list of robots for guest', function (done) {
                request(app)
                    .get('/api/contacts')
                    .set('authorization', 'Bearer ' + guestToken)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .end(function (err, res) {
                        var contacts = res.body;
                        console.log('contacts',contacts)
                        contacts.length.should.be.gt(1);
                        contacts[0].name.toString().should.be.equal('Echo');
                        done();
                    });
            });
        });
    });
});
