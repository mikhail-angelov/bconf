'use strict';

var _index = require('../eventBus/index.js');

var _index2 = _interopRequireDefault(_index);

var _robotMaster = require('./robotMaster.js');

var _robotMaster2 = _interopRequireDefault(_robotMaster);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RobotMaster', function () {

    var eventBus = new _index2.default();
    var robotMaster = new _robotMaster2.default(eventBus);

    it('should be defined', function () {

        robotMaster.should.be.defined;
    });
});
//# sourceMappingURL=robotMaster.spec.js.map
