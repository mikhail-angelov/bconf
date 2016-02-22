'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseBot = require('./baseBot.js');

var _baseBot2 = _interopRequireDefault(_baseBot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Echo = function (_BaseBot) {
    _inherits(Echo, _BaseBot);

    function Echo(RobotManager) {
        _classCallCheck(this, Echo);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Echo).call(this, RobotManager, 'echo'));

        _this.name = 'Echo';
        _this.avatar = 'assets/material/share-arrow.svg';
        return _this;
    }

    _createClass(Echo, [{
        key: 'dispatch',
        value: function dispatch(client, message) {
            this.RobotManager.send(client, message);
        }
    }]);

    return Echo;
}(_baseBot2.default);

exports.default = Echo;
//# sourceMappingURL=echo.js.map
