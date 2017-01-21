const redux = require('redux')
const reducers = require('./reducers')
const thunk = require('redux-thunk').default
const wsListener = require('./middleware/wsListener')
const peerListner = require('./middleware/peerListner')

const middleware = [
    thunk,
    peerListner.middleware,
    wsListener.middleware
]
function configureStore() {
    const store = redux.createStore(
        reducers,
        redux.applyMiddleware(...middleware)
    );

    return store;
}

module.exports = configureStore()
