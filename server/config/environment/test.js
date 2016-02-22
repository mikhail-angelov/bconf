'use strict';

// Test specific configuration
// ===========================

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/bconf-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  },
  port: 9005
};
//# sourceMappingURL=test.js.map
