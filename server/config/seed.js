/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_user2.default.find({}).removeAsync().then(function () {
  _user2.default.createAsync({
    provider: 'local',
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }).then(function () {
    console.log('finished populating users');
  });
});
//# sourceMappingURL=seed.js.map
