var mongoose = require('mongoose');

var schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId
    , id: {type: String, required: true}
    , last_name: {type: String, required: true}
    , first_name: {type: String, required: true}
    , email: {type: String, required: true}
    , avatar: {type: String, required: false}
    , display_name: {type: String, required: false}
    , gender: {type: String, required: false}
    , birthday: {type: String, required: false}
    , data: {type: String, required: false}
    , provider: {type: String, required: true}
    , provider_id: {type: String, required: true}
    , provider_token: {type: String, required: false}
    , provider_refresh_token: {type: String, required: false}
    , shared_token: {type: String, required: true}
    , access_token: {type: String, required: true}
    , refresh_token: {type: String, required: true}
    , friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
      }]
  }
);
var User = mongoose.model('User', schema);

module.exports = User;
