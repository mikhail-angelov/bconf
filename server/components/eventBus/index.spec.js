'use strict';

var _index = require('../eventBus/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('EventBus', function () {

  var testMessage = 'test';
  var eventBus = new _index2.default();

  it('should subscribe to event and get event', function (done) {

    eventBus.once(testMessage, function (message) {
      console.log('get message', message);
      expect(message).to.be(testMessage);

      done();
    });

    eventBus.emit(testMessage, testMessage);
  });
});
//# sourceMappingURL=index.spec.js.map
