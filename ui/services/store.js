const redux = require('redux')
const reducers = require('./reducers')
const thunk = require('redux-thunk').default
const wsListener = require('./middleware/wsListener')
const uiRouter = require('./middleware/uiRouter')
const peerListner = require('./middleware/peerListner')

const middleware = [
    uiRouter,
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
