const actions = require('../actions')
const peerManager = require('../services/peerManager')

let peer

function start (store, user) {
  peer = peerManager({
    username: user.id,
    onOpen: () => console.log('open'),
    onConnect: () => console.log('connect'),
    onMessage: (payload) => {
      const contact = getOrCreateContact(store, payload.author)
      store.dispatch(actions.chatMessage(payload, contact))
    }
  })
  return peer
}

function getOrCreateContact (store, contactId) {
  const contacts = store.getState().contacts.contacts
  const contact = contacts.find(item => item.id === contactId)
  if (contact) {
    return contact
  } else {
    const newContact = {
      id: contactId,
      firstName: contactId
    }
    store.dispatch(actions.addContact(newContact))
    return newContact
  }
}

function peerMiddleware (store) {
  return (next) => (action) => {
    const returnValue = next(action)
    switch (action.type) {
      case actions.chats.INIT:
        return start(store, action.user)
      case actions.chats.SEND_MESSAGE: {
        console.log('----------')
        return peer.send(action.message)
      }
    }
    return returnValue
  }
}

module.exports = {
  start: start,
  middleware: peerMiddleware
}
