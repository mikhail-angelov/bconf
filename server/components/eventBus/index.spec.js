'use strict';

import eventBusFactory  from '../eventBus';

describe('EventBus', function () {

  const testMessage = 'test';
  var eventBus = new eventBusFactory();

  it('should subscribe to event and get event', function (done) {


    eventBus.once(testMessage, function ( message) {
      console.log('get message', message)
      expect(message).to.be(testMessage);

      done();
    });

    eventBus.emit(testMessage, testMessage)
  });



});
