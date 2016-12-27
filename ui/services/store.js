const redux = require('redux')
const reducers = require('./reducers')
const thunk = require('redux-thunk').default
const wsListener = require('./middleware/wsListener')
const uiRouter = require('./middleware/uiRouter')
const peerListner = require('./middleware/peerListner')

function configureStore() {
    const store = redux.createStore(
        reducers,
        redux.applyMiddleware(uiRouter),
        redux.applyMiddleware(thunk),
        redux.applyMiddleware(wsListener.middleware),
        redux.applyMiddleware(peerListner.middleware)
        
    );

    return store;
}

module.exports = configureStore()
