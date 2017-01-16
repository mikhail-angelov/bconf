'use strict';

const expect = require('chai').expect

describe('local', () => {
    const mongoUnit = require('mongo-unit')
    const dbData = require('../../../test/fixtures/authDb.json')
    const daoService = require('../../dao')
    var dao
    var auth
    var local

    before(() => mongoUnit.start()
        .then(mongoUrl => daoService({
            url: mongoUrl
        }))
        .then(_dao => {
            dao = _dao
            auth = require('../auth.service')(dao)
            local = require('./index')(auth)
        })
        .then(() => mongoUnit.load(dbData)))

    after(() => mongoUnit.drop())

    it('should succesfuly login', () => {
        return local.login({
            email: 'test',
            password: 'test'
        }).then(user => {
            expect(!!user.token).to.equal(true)
            expect(user.firstName).to.equal('Unit')
        })
    })

    it('should fail login, invalid password', () => {
        return local.login({
            email: 'test',
            password: 'wrong'
        }).catch(err => {
            expect(err).to.equal('Invalid password')
        })
    })

    it('should fail login, invalid mail', () => {
        return local.login({
            email: 'wrong',
            password: 'test'
        }).catch(err => {
            expect(err).to.equal('Invalid password')
        })
    })

})