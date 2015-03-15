var User = require('../models/user')
var Promise = require('promise');
var _ = require('lodash_node');

function auth(id, token) {
  return new Promise(function (resolve, reject) {
    User.findOne({id: id, access_token: token}, function (err, user) {
      console.log('find user ' + id + ' status: ' + err);
      if (!user) {
        reject();
      } else {
        resolve();
      }
    });
  });
}



function isFriend(userId, personId) {
  return new Promise(function (resolve, reject) {
    User.findOne({id: userId}, function (err, user) {
      if (!user) {
        resolve(false);
      } else {
        if (_.indexOf(user.friends, personId) >= 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}

module.exports = {
  auth: auth,
  getFriends: getFriends,
  isFriend: isFriend
};
