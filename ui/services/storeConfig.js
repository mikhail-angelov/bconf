const redux = require('redux')

const reducers = require('./reducers')
const store = redux.createStore(reducers[0])


module.exports = {
    store
}