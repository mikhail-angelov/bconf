import eventBusFactory from '../eventBus/index.js'
import robotMasterFactory from './robotMaster.js'

describe('RobotMaster', function() {
  var eventBus = new eventBusFactory()
  var robotMaster = new robotMasterFactory(eventBus)

  it('should be defined', function() {
    robotMaster.should.be.defined
  })
})
