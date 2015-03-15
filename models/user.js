var mongoose = require('mongoose');
var Promise = require('promise');
var uuid = require('node-uuid');
var _ = require('lodash-node');

var schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId
    , id: {type: String, required: true}
    , lastName: {type: String, required: false}
    , firstName: {type: String, required: false}
    , email: {type: String, required: false}
    , avatar: {type: String, required: false}
    , displayName: {type: String, required: true}
    , gender: {type: String, required: false}
    , birthday: {type: String, required: false}
    , data: {type: String, required: false}
    , provider: {type: String, required: true}
    , providerId: {type: String, required: true}
    , providerToken: {type: String, required: false}
    , providerRefreshToken: {type: String, required: false}
    , sharedToken: {type: String, required: false}
    , accessToken: {type: String, required: true}
    , refreshToken: {type: String, required: true}
    , friends: [String]
  }, {collection: 'User'}
);
var User = mongoose.model('User', schema);
User.createGuest = createGuest;
User.createUser = createUser;
User.getFriends = getFriends;

function createGuest(guest) {
  return new Promise(function (resolve, reject) {
    guest = _.extend(guest,{
      id: 'guest' + uuid.v1(),
      displayName: 'guest',
      avatar:'images/anonymous.png',
      provider:'none',
      providerId:'none',
      accessToken: uuid.v1(),
      refreshToken: uuid.v1()
    });
    _create(guest).then(function(newGuest){
      var referId = newGuest.friends[0];
      User.findOne({id:referId}, function(err, refer){
        if(!err){
         refer.friends.push(newGuest.id);
          refer.save(function(err){
            if(!err){
              resolve(newGuest);
            }
          })
        }
      })
    });
  });
}

function createUser(user) {
  user = _.extend(user,{
    id: uuid.v1(),
    sharedToken: uuid.v1(),
    accessToken: uuid.v1(),
    refreshToken: uuid.v1()
  });
  return _create(user);
}

function getFriends(id) {
  return new Promise(function (resolve, reject) {
    User.findOne({id: id}, function (err, user) {
      if (!user) {
        reject();
      } else {
        var friendIds = user.friends;
        if (_.isEmpty(friendIds)) {
          resolve([]);
        } else {
          User.find({id: {$in: friendIds}}, function (err, collection) {
            resolve(collection);
          });
        }
      }
    });
  });
}

function _create(user) {
  return new Promise(function (resolve, reject) {
    var newUser = new User(user);
    newUser.save(function (err, newUser, num) {
      if (err) {
        console.log('error saving user');
        reject(err);
      } else {
        resolve(newUser);
      }
    });
  });
}

module.exports = User;
