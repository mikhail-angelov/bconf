var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Q = require('q');

var schema =  new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId
    ,user_id: {type: String, required: true}
    ,token: {type: String, required: true}
    ,refresh_token: {type: String, required: true}
    ,token_expires: {type: String, required: true}
  }
);
schema.createSession = function(userId){
  var deferred = Q.defer();
  var expireDate = new Date().getTime() + 86400000; //86400 - sec in day
  var session = {
    user_id: userId,
    token: uuid.v1(),
    refresh_token: uuid.v1(),
    token_expires: expireDate
  };
  var newSession = new schema(session);
  newSession.save(function (err, s, num) {
    if (err) {
      console.log('error saving token');
    }
    deferred.resolve(newSession);
  });
  return deferred.promise;
};

module.exports = mongoose.model('Session', schema);
