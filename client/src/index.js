import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import Root from './components/Root'
import './styles/index.css'
//import registerServiceWorker from './registerServiceWorker'
import { unregister } from './registerServiceWorker';


const store = createStore(
  reducers,
  applyMiddleware(thunk, createLogger())
)

ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'))
// registerServiceWorker()
unregister()