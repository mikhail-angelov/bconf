import _ from 'lodash'
import echoFactory from './echo.js'
import yaTranslatorFactory from './yaTranslator.js'

class RobotManager {
  constructor (bus) {
    this.bots = {}
    this.eventBus = bus
    this.eventBus.on(this.eventBus.SOCKET_MESSAGE, (client, message) => this.dispatch(client, message))

    let echo = new echoFactory(this)
    let yatr = new yaTranslatorFactory(this)
  }

  register (bot) {
    this.bots[bot.id] = bot
  }

  dispatch (client, data) {
    try {
      console.log(data)
      var message = JSON.parse(data)
      if (message && message.bot) {
        let bot = this.bots[message.bot]
        if (bot) {
          bot.dispatch(client, message)
        }
      }
    } catch (e) {
      console.log('Invalid robot message', data, e)
    }
  }

  send (client, message) {
    this.eventBus.emit(this.eventBus.SEND_MESSAGE, client, message)
  }

  getAll () {
    return _.map(this.bots, (bot) => {
      return {
        type: bot.type,
        id: bot.id,
        name: bot.name,
        avatar: bot.avatar
      }
    })
  }
}

export default RobotManager
