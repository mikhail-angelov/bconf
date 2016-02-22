'use strict';

var util = {
  debug: false,
  inherits: function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function extend(dest, source) {
    source = source || {};
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  randomId: function randomId() {
    return (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
  },
  prettyError: function prettyError(msg) {
    console.log('ERROR PeerServer: ', msg);
  }
};

module.exports = util;
//# sourceMappingURL=index.js.map
