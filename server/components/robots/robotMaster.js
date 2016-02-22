'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _echo = require('./echo.js');

var _echo2 = _interopRequireDefault(_echo);

var _yaTranslator = require('./yaTranslator.js');

var _yaTranslator2 = _interopRequireDefault(_yaTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RobotManager = function () {
    function RobotManager(bus) {
        var _this = this;

        _classCallCheck(this, RobotManager);

        this.bots = {};
        this.eventBus = bus;
        this.eventBus.on(this.eventBus.SOCKET_MESSAGE, function (client, message) {
            return _this.dispatch(client, message);
        });

        var echo = new _echo2.default(this);
        var yatr = new _yaTranslator2.default(this);
    }

    _createClass(RobotManager, [{
        key: 'register',
        value: function register(bot) {
            this.bots[bot.id] = bot;
        }
    }, {
        key: 'dispatch',
        value: function dispatch(client, data) {
            try {
                console.log(data);
                var message = JSON.parse(data);
                if (message && message.bot) {
                    var bot = this.bots[message.bot];
                    if (bot) {
                        bot.dispatch(client, message);
                    }
                }
            } catch (e) {
                console.log('Invalid robot message', data, e);
            }
        }
    }, {
        key: 'send',
        value: function send(client, message) {
            this.eventBus.emit(this.eventBus.SEND_MESSAGE, client, message);
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            return _lodash2.default.map(this.bots, function (bot) {
                return {
                    type: bot.type,
                    id: bot.id,
                    name: bot.name,
                    avatar: bot.avatar
                };
            });
        }
    }]);

    return RobotManager;
}();

exports.default = RobotManager;
//# sourceMappingURL=robotMaster.js.map
