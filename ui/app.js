import riot from 'riot'
import route from 'riot-route'

import './components/welcome.tag'
import './components/auth/auth.tag'
import './components/main/main.tag'

import store from './store'
import action from './actions'

window.addEventListener("DOMContentLoaded", function load() {
  let currentPage = null
  let currentSingup = null

  saveRedirectToken()
  const subRoute = route.create()
  subRoute(() => goTo('welcome'))
  subRoute('/auth', () => goTo('auth'))
  subRoute('/main', () => goTo('main'))

  route.start()
  route.exec(goTo)

  function goTo(page) {
    console.log('route', page)
    if (currentPage) {
      currentPage.unmount(true); //unmount and keep parent tag
    }

    const mounted = riot.mount('div#content', page, { store, action })
    if (mounted) {
      currentPage = mounted[0];
    }
  }
}, true)

function saveRedirectToken() {
  const redirectToken = getAuthRedirectToken()
  if (redirectToken) {
    localStorage.setItem('token', redirectToken)
  }
}

function getAuthRedirectToken() {
  if (document.location.hash && document.location.hash.indexOf('#auth-redirect=') === 0) {
    return document.location.hash.substr(15)
  } else {
    return null
  }
}