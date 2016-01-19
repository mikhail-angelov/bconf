class EventBus {

    constructor($rootScope) {
        this.$rootScope = $rootScope;
        angular.extend(this, {
            auth: {
                IN: 'login',
                OUT: 'logout'
            },
            profile: {
                LOAD: 'loadProfile'
            },
            contacts: {
                LOAD: 'loadContacts',
                SELECT: 'selectContact'
            },
            chats: {
                LOAD_ALL: 'loadAllChats',
                SELECT_CHAT: 'selectCurrentChat'
            },
            messages: {
                ADD: 'addMessage',
                LOAD_ALL: 'loadAllChatMessages'
            },
            peer: {
                START_CHAT: 'startChat',
                PRESENCE: 'peerPresence',
                INCOMING_CALL: 'incomingCall',
                ERROR_CALL: 'errorCall',
                CLOSE_CALL: 'closedCall',
                CONNECTED_CALL: 'connectedCall'
            }
        });
    }

    emit(event) {
        return this.$rootScope.$broadcast.apply(this.$rootScope, arguments);
    }

    on(event, cb) {
        return this.$rootScope.$on(event, cb);
    }

}

export default EventBus;