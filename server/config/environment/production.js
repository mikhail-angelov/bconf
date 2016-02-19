'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          9000,

  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_MONGODB_DB_URL +
          process.env.OPENSHIFT_APP_NAME ||
          process.env.MONGODB || 'mongodb://' + (process.env.DATABASE_1_PORT_27017_TCP_ADDR || 'localhost') + ':' + (process.env.DATABASE_1_PORT_27017_TCP_PORT || '27017') + '/bconf',
  }
};
