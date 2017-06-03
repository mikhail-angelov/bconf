'use strict';

const expect = require('chai').expect
const mongoUnit = require('mongo-unit')

describe('contacts', () => {
    const dbData = require('../test/fixtures/contactsDb.js')
    const contacts = require('./contacts')

    beforeEach(() => mongoUnit.load(dbData))
    afterEach(() => mongoUnit.drop())

    it('should get users contacts', () => {
        return contacts.getContacts("5554ba3324d05f4bc2cab3f1")
            .then(contacts => {
                expect(contacts.length).to.equal(2)
            })
    })

    it('should add contacts', () => {
        return contacts.addContact("5554ba3324d05f4bc2cab3f1", "5554ba3324d05f4bc2cab3f0")
            .then(contacts => {
                expect(contacts.length).to.equal(2)
            })
    })

    it('should find contacts', () => {
        return contacts.findContacts("5554ba3324d05f4bc2cab3f1", 'guest')
            .then(contacts => {
                expect(contacts.length).to.equal(1)
                expect(contacts[0].firstName).to.equal('Guest')
            })
    })
})