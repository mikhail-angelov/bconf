'use strict';

const expect = require('chai').expect

describe('sequrity', () => {
    const security = require('./security')
    
    it('should encode token', () => {
        const token = {test:'test'}
        const encodedToken = security.encodeToken(token)
        expect(token != encodedToken).to.equal(true)
        expect(security.decodeToken(encodedToken).test).to.equal(token.test)
    })

    it('should encode password', () => {
        const password = 'test'
        const encodedPassword = security.encodePassword(password)
        // expect(token != encodedPassword).to.equal(true)
        expect(security.validatePassword(password, encodedPassword)).to.equal(true)
        expect(security.validatePassword('wrong', encodedPassword)).to.equal(false)
    })

})