import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import Auth from './stores/auth'
import Ui from './stores/ui'
import Root from './components/Root'
import './styles/index.css'
import DevTools from 'mobx-react-devtools'

// import registerServiceWorker from './registerServiceWorker'
// import { unregister } from './registerServiceWorker';
const stores = {
    authStore: new Auth(),
    uiStore: new Ui(),
}

ReactDOM.render(
    <React.Fragment>
        <DevTools />
        <Provider {...stores}>
            <Root />
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
)
// registerServiceWorker()
// unregister()
