'use strict';

var _index = require('../eventBus/index.js');

var _index2 = _interopRequireDefault(_index);

var _robotMaster = require('./robotMaster.js');

var _robotMaster2 = _interopRequireDefault(_robotMaster);

var _echo = require('./echo.js');

var _echo2 = _interopRequireDefault(_echo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Echo Bot', function () {

    var testMessage = {
        bot: 'echo',
        msg: 'test'
    };
    var eventBus = new _index2.default();
    var robotMaster = new _robotMaster2.default(eventBus);
    var echo = new _echo2.default(robotMaster);

    it('should be defined', function () {
        robotMaster.should.be.defined;
        echo.should.be.defined;
    });

    it('register bot', function () {

        var bot = robotMaster.bots['echo'];
        bot.should.be.defined;
    });

    it('dispatch events', function (done) {

        eventBus.once(eventBus.SEND_MESSAGE, function (client, message) {
            console.log('get message', message);
            expect(testMessage.msg).to.be(message.msg);

            done();
        });

        eventBus.emit(eventBus.SOCKET_MESSAGE, {}, JSON.stringify(testMessage));
    });
});
//# sourceMappingURL=echo.spec.js.map
