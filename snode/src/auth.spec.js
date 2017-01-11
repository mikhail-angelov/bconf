'use strict';

const expect = require('chai').expect

describe('auth', () => {
    const mongoUnit = require('mongo-unit')
    const dbData = require('../test/fixtures/authDb.json')
    const daoService = require('./dao')
    var dao
    var auth

    before(() => mongoUnit.start()
        .then(mongoUrl => daoService({
            url: mongoUrl
        }))
        .then(_dao => {
            dao = _dao
            auth = require('./auth')(dao)
        })
        .then(() => mongoUnit.load(dbData)))

    after(() => mongoUnit.drop())

    it('should succesfuly login', () => {
        return auth.login({
            email: 'test',
            password: 'test'
        }).then(user => {
            expect(!!user.token).to.equal(true)
            expect(user.firstName).to.equal('Unit')
        })
    })

    it('should fail login, invalid password', () => {
        return auth.login({
            email: 'test',
            password: 'wrong'
        }).catch(err => {
            expect(err).to.equal('Invalid password')
        })
    })

    it('should fail login, invalid mail', () => {
        return auth.login({
            email: 'wrong',
            password: 'test'
        }).catch(err => {
            expect(err).to.equal('Invalid password')
        })
    })

    it('should create new user', () => {
        return auth.createUser({
            email: 'new mail',
            password: 'test',
            firstName: 'NewUser'
        }).then(user => {
            expect(!!user.token).to.equal(true)
            expect(user.firstName).to.equal('NewUser')
        })
    })

    it('should fail create user if mail exist', () => {
        return auth.login({
            email: 'test',
            password: 'test'
        }).catch(err => {
            expect(err).to.equal('The user with this email is already exist.')
        })
    })
})