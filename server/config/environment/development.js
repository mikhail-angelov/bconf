'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB || 'mongodb://' + (process.env.DATABASE_1_PORT_27017_TCP_ADDR || '192.168.99.100') + ':' + (process.env.DATABASE_1_PORT_27017_TCP_PORT || '27017') + '/bconf-dev',
  },

  // Seed database on startup
  seedDB: false

};
