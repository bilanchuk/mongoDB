var mongoose = require('../mongoose');
var schemaUser = mongoose.Schema({
	name:{
		type:String,
		unique:true,
		required:true
	},
	age:{
		type:Number,
		unique:false,
		required:true
	}
},{versionKey:false});
var user = mongoose.model("User",schemaUser);
module.exports = user;