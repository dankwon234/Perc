var mongoose = require('mongoose');


var CompanySchema = new mongoose.Schema({
	name: {type:String, trim:true, default:''},
	website: {type:String, trim:true, default:''},
	description: {type:String, trim:true, default:''},
	url: {type:String, trim:true, default:''}, // url path, e.g. www.getpercs.com/profile/dan-kwon234
	image: {type:String, trim:true, default:''},
	community: {type:String, default:''},
	password: {type:String, default:''},
	timestamp: {type:Date, default:Date.now},
});


CompanySchema.methods.summary = function() {
	var summary = {
		'name':this.name,
		'website':this.website,
		'description':this.description,
		'url':this.url,
		'image':this.image,
		'community':this.community,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('CompanySchema', CompanySchema);