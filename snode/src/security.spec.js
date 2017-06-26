'use strict'

const expect = require('chai').expect

describe('security', () => {
  const security = require('./security')

  it('should encode token', () => {
    const user = {id: 'test', name: 'test'}
    const encodedToken = security.encodeToken(user)
    expect(user).to.eql(encodedToken)
    expect(security.decodeToken(encodedToken).name).to.equal(user.name)
  })

  it('should encode password', () => {
    const password = 'test'
    const encodedPassword = security.encodePassword(password)
    // expect(token != encodedPassword).to.equal(true)
    expect(security.validatePassword(password, encodedPassword)).to.equal(true)
    expect(security.validatePassword('wrong', encodedPassword)).to.equal(false)
  })
})
