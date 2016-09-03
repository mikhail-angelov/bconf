const redux = require('redux')
const reducers = require('./reducers')

module.exports = redux.createStore(reducers)
