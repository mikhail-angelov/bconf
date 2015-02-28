var mongoose = require('mongoose');

var schema =  new mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId
    ,id: {type: String, required: true}
		,last_name: {type: String, required: true}
		,first_name: {type: String, required: true}
		,email: {type: String, required: true}
    ,avatar: {type: String, required: false}
    ,data: {type: String, required: false}
    ,provider: {type: String, required: true}
    ,provider_token: {type: String, required: false}
    ,provider_refresh_token: {type: String, required: false}
    ,friends: {type: String, required: false}
	}
);

module.exports = mongoose.model('User', schema);
