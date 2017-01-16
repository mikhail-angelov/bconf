'use strict'

const router = require('express').Router()
const security = require('./security')

module.exports = (dao) => {
    router.get('/', security.authRequired, (req, res) => {
        getContacts(req.decoded.id)
            .then(contacts => res.json(contacts || []))
            .catch(err => res.status(400).end('search error'))
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
        return dao.findById('users', userId)
            .then(user => {
                if(user){
                    return dao.find('users', { _id: { $in: user.contacts||[] } })
                }else{
                    return Promise.reject('invalid user id ' + userId)
                }
            })
    }

    function addContact(userId, contactId) {
        return dao.findById('users', userId)
            .then(user => {
                if(user){
                    const contacts = user.contacts || []
                    contacts.push(contactId)
                    return dao.update('users',{_id:user._id},{contacts: contacts})
                }else{
                    return Promise.reject('invalid user id ' + userId)
                }
            })
            .then(user => getContacts(user.id))
    }

    function findContacts(userId, text) {
        const query = new RegExp(text || '')
        return dao.find('users', {$or:[{ firstName: query  },{ lastName: query  }]})
    }

    return {
        router,

        //private
        getContacts,
        addContact,
        findContacts
    }
}