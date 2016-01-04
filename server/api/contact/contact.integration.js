'use strict';

import app from '../..';
import User from '../user/user.model';
import request from 'supertest';

describe('Contact API:', function () {
    var user;
    var otherUser;

    // Clear users before testing
    before(function () {
        return User.removeAsync().then(function () {
            user = new User({
                name: 'Fake User',
                email: 'test@example.com',
                password: 'password'
            });
            otherUser = new User({
                provider: 'local',
                name: 'Other User',
                email: 'other@example.com',
                password: 'password'
            });

            return user.saveAsync()
                .then(()=>otherUser.saveAsync())
                .then(()=>user.addContact(user._id, otherUser._id));
        });
    });

    // Clear users after testing
    after(function () {
        return User.removeAsync();
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
                    console.log('---', res.body);
                    var contacts = res.body;
                    contacts.length.should.be.equal(1);
                    contacts[0]._id.toString().should.be.equal(otherUser._id.toString());
                    done();
                });
        });

        it('should respond with a 401 when not authenticated', function (done) {
            request(app)
                .get('/api/contacts')
                .expect(401)
                .end(done);
        });
    });
});
