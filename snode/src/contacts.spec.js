'use strict';

const expect = require('chai').expect

describe('contacts', () => {
    const mongoUnit = require('mongo-unit')
    const dbData = require('../test/fixtures/contactsDb.json')
    const daoService = require('./dao')
    var dao
    var contacts

    before(() => mongoUnit.start()
        .then(mongoUrl => daoService({
            url: mongoUrl
        }))
        .then(_dao => {
            dao = _dao
            contacts = require('./contacts')(dao)
        })
        .then(() => mongoUnit.load(dbData)))

    after(() => mongoUnit.drop())

    it('should get users contacts', () => {
        return contacts.getContacts('unit-test')
            .then(contacts => {
                expect(contacts.length).to.equal(2)
            })
    })

    it('should add contacts', () => {
        return contacts.addContact('unit-test', 'guest')
            .then(contacts => {
                expect(contacts.length).to.equal(3)
            })
    })

    it('should find contacts', () => {
        return contacts.findContacts('unit-test', 'guest')
            .then(contacts => {
                expect(contacts.length).to.equal(1)
                expect(contacts[0].firstName).to.equal('Guest')
            })
    })
})