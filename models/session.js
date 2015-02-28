var mongoose = require('mongoose');

var schema =  new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId
    ,user_id: {type: String, required: true}
    ,token: {type: String, required: true}
    ,refresh_token: {type: String, required: true}
    ,token_expires: {type: String, required: true}
  }
);

module.exports = mongoose.model('Session', schema);
