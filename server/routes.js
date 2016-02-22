'use strict';

var _index = require('./components/errors/index');

var _index2 = _interopRequireDefault(_index);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/chats', require('./api/chat'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_index2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};
//# sourceMappingURL=routes.js.map
