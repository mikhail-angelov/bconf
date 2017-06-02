'use strict'

const ObjectId = require('mongodb').ObjectId
const router = require('express').Router()
const security = require('./security')
const dao = require('./dao')
const co = require('co')

router.get('/', security.authRequired, (req, res) => {
    getContacts(req.decoded.id)
        .then(contacts => res.json(contacts || []))
        .catch(err => res.status(400).end('get contacts error'))
})
router.post('/', security.authRequired, (req, res) => {
    addContact(req.decoded.id, req.body)
        .then(contacts => res.json(contacts || []))
        .catch(err => res.status(400).end('add contact error'))
})

router.get('/search', security.authRequired, (req, res) => {
    findContacts(req.decoded.id, req.query.q)
        .then(contacts => res.json(contacts || []))
        .catch(err => res.status(400).end('search error'))
})

function getContacts(userId) {
    return co(function*(){
        //const user = yield dao.findById('users', userId)
        //const contacts = yield dao.find('users', { _id: { $in: user.contacts || [] } })

        return [
            {
                _id:'bot1',
                name: 'test bot one',
                sub: 'it should echo you'
            },
            {
                _id:'bot2',
                name: 'test bot two',
                sub: 'for test purpose only'
            }
        ]
    })
}

function addContact(userId, contactId) {
    return dao.findById('users', userId)
        .then(user => {
            if (user) {
                const contacts = user.contacts || []
                contacts.push(ObjectId(contactId))
                return dao.update('users', { _id: user._id }, { contacts: contacts })
            } else {
                return Promise.reject('invalid user id ' + userId)
            }
        })
        .then(() => getContacts(userId))
}

function findContacts(userId, text) {
    const query = new RegExp(text || '', 'i')
    return dao.find('users', { $or: [{ firstName: query }, { lastName: query }] })
}

module.exports = {
    router,

    //private
    getContacts,
    addContact,
    findContacts
}