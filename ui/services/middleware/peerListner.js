const actions = require('../../services/actions/index.js')
const peerManager = require('../peerManager')

let peer;

function start(store, user) {
    peer = peerManager({
        username: user.id,
        onOpen: () => console.log('open'),
        onConnect: () => console.log('connect'),
        onMessage: (data) => store.dispatch(actions.chatMessage(data))
    });
    return peer;
}

function peerMiddleware (store) {
    return (next) => (action) => {

        const returnValue = next(action)
        switch (action.type) {
            case actions.chats.INIT:
                return start(store, action.user);
            case actions.chats.SEND_MESSAGE: {
                console.log('----------')
                return peer.send(action.message);
            }
        }
        return returnValue
    }
}

module.exports = {
    start: start,
    middleware: peerMiddleware
}
