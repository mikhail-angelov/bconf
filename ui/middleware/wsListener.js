
const webSocket = require('../services/webSocket')
const actions = require('../actions')

const sock = {
  ws: null,
  URL: 'echo.websocket.org',
  wsDipatcher: (store) => (msg) => {
    const action = actions.addMessage({
      id: 'any',
      userId: 'test',
      text: '> ' + msg,
      type: 'in',
      from: 'you',
      date: new Date()
    })
    console.log('get it', msg)
    return store.dispatch(action)
  },
  middleware: function (store) {
    return (next) => (action) => {
      console.log('will dispatch', action)

      sock.dispatch(action, store)
      // Call the next dispatch method in the middleware chain.
      let returnValue = next(action)

      console.log('state after dispatch', store.getState())

      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }
  },

  dispatch: (action, store) => {
    switch (action.type) {
      case actions.ws.SEND_MESSAGE:
        return sock.ws.sendMessage(action.text)

      case actions.ws.OPEN:
        return sock.startWS(action.url, store)

      case actions.ws.CLOSE:
        return sock.stopWS()

      default:
    }
  },
  stopWS: () => {
    sock.ws.close()
    sock.ws = null
  },
  startWS: (url, store) => {
    if (sock.ws) sock.ws.close()

    sock.ws = new webSocket(url || sock.URL, sock.wsDipatcher(store))
  }
}

module.exports = sock
