var mongoose = require('mongoose');


var CommunitySchema = new mongoose.Schema({
	name: {type:String, trim:true, default:''},
	website: {type:String, trim:true, default:''},
	description: {type:String, trim:true, default:''},
	url: {type:String, trim:true, default:''}, // url path, e.g. www.getpercs.com/profile/dan-kwon234
	image: {type:String, trim:true, default:''},
	password: {type:String, default:''},
	timestamp: {type:Date, default:Date.now},
});


CommunitySchema.methods.summary = function() {
	var summary = {
		'name':this.name,
		'website':this.website,
		'description':this.description,
		'url':this.url,
		'image':this.image,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('CommunitySchema', CommunitySchema);