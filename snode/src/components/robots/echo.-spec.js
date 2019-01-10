import eventBusFactory from '../eventBus/index.js'
import robotMasterFactory from './robotMaster.js'
import echoFactory from './echo.js'

describe('Echo Bot', function() {
  const testMessage = {
    bot: 'echo',
    msg: 'test',
  }
  var eventBus = new eventBusFactory()
  var robotMaster = new robotMasterFactory(eventBus)
  var echo = new echoFactory(robotMaster)

  it('should be defined', function() {
    robotMaster.should.be.defined
    echo.should.be.defined
  })

  it('register bot', function() {
    let bot = robotMaster.bots['echo']
    bot.should.be.defined
  })

  it('dispatch events', function(done) {
    eventBus.once(eventBus.SEND_MESSAGE, function(client, message) {
      console.log('get message', message)
      expect(testMessage.msg).to.be(message.msg)

      done()
    })

    eventBus.emit(eventBus.SOCKET_MESSAGE, {}, JSON.stringify(testMessage))
  })
})
