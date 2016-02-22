'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseBot = function BaseBot(RobotManager, id) {
    _classCallCheck(this, BaseBot);

    this.RobotManager = RobotManager;
    this.type = 'bot';
    this.id = id;
    RobotManager.register(this);
};

exports.default = BaseBot;
//# sourceMappingURL=baseBot.js.map
