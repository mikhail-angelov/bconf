import eventBus from './eventBus.js'
import chatsStore from './chatsStore.js'
import profileStore from './profileStore.js'
import contactsStore from './contactsStore.js'
import messagesStore from './messagesStore.js'

angular.module('fluxStores.module', [])
    .service('EventBus', eventBus)
    .service('ChatsStore', chatsStore)
    .service('ProfileStore', profileStore)
    .service('ContactsStore', contactsStore)
    .service('MessagesStore', messagesStore)
    .run((ProfileStore, ChatsStore, ContactsStore, MessagesStore)=> {
    });