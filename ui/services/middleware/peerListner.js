const actions = require('../../services/actions/index.js')
const peerManager = require('../peerManager')

module.exports = {
    start,
    middleware
}
let peer;

function start(store, user) {
    peer = peerManager.openPeer({
        username: user.id,
        onOpen: () => console.log('open'),
        onConnect: () => console.log('connect'),
        onMessage: (data) => store.dispatch(actions.addMessage(data))
    });
    return peer;
}

function middleware(store) {
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

