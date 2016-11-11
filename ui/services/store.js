const redux = require('redux')
const reducers = require('./reducers')
const thunk = require('redux-thunk').default
const wsListener = require('./middleware/wsListener')

function configureStore() {
    const store = redux.createStore(
        reducers,
        redux.applyMiddleware(thunk),
        redux.applyMiddleware(wsListener.middleware)
    );

    return store;
}

module.exports = configureStore()
