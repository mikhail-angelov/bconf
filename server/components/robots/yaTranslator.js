'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseBot = require('./baseBot.js');

var _baseBot2 = _interopRequireDefault(_baseBot);

var _index = require('../../config/environment/index');

var _index2 = _interopRequireDefault(_index);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YT = function (_BaseBot) {
    _inherits(YT, _BaseBot);

    function YT(RobotManager, $http) {
        _classCallCheck(this, YT);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YT).call(this, RobotManager, 'yandex-translator'));

        _this.name = 'Yandex translator';
        _this.$http = $http;

        _this.url = 'https://translate.yandex.net/api/v1.5/tr.json/';
        _this.key = _index2.default.yandex.translationKey;
        return _this;
    }

    _createClass(YT, [{
        key: 'dispatch',
        value: function dispatch(client, message) {
            var _this2 = this;

            console.log('message', message);
            this.getLanguages().then(function () {
                return _this2.detectText(message.payload.msg);
            }).then(function () {
                return _this2.translateText(message.payload.msg, 'en-ru');
            }).then(function (translated) {
                message.payload.msg = translated.text[0];
                _this2.RobotManager.send(client, message);
            });
        }
    }, {
        key: 'getLanguages',
        value: function getLanguages() {
            var url = this.url + 'getLangs?key=' + this.key + '&ui=' + 'en';

            return (0, _requestPromise2.default)(url).then(function (json) {
                console.log('getlang', json);
                return json;
            });
        }
    }, {
        key: 'detectText',
        value: function detectText(text) {
            var url = this.url + 'detect?key=' + this.key + '&text=\"' + text + '\"';
            return (0, _requestPromise2.default)(url).then(function (json) {
                console.log('detect', json);
                return json;
            });
        }
    }, {
        key: 'translateText',
        value: function translateText(text, lang) {
            var url = this.url + 'translate?key=' + this.key + '&text=\"' + text + '\"&lang=' + lang + '';
            console.log('translate', url);
            return (0, _requestPromise2.default)(url).then(function (json) {
                console.log('translate', json);
                return JSON.parse(json);
            });
        }
    }]);

    return YT;
}(_baseBot2.default);

exports.default = YT;
//# sourceMappingURL=yaTranslator.js.map
