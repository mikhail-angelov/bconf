'use strict';

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Session', function () {

  var testClient = { id: '1', key: '2', token: 'test', ip: '0', socket: {} };

  it('should add, get, delete client', function () {

    _session2.default.add(testClient);
    var client = _session2.default.getById(testClient.id);
    expect(client, testClient);

    _session2.default.delete(testClient);
    var client = _session2.default.getById(testClient.id);
    expect(client, null);
  });

  it('should return unuque id', function () {
    var id = _session2.default.generateUniquId();
    id.should.be.defined;
  });
});
//# sourceMappingURL=index.spec.js.map
