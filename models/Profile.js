var mongoose = require('mongoose');


var ProfileSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	url: {type:String, trim:true, default:''}, // url path, e.g. www.getpercs.com/profile/dan-kwon234
	email: {type:String, trim:true, lowercase:true, default:''},
	bio: {type:String, trim:true, default:''},
	image: {type:String, trim:true, default:''},
	community: {type:String, default:''},
	password: {type:String, default:''},
	timestamp: {type:Date, default:Date.now},
});


ProfileSchema.methods.summary = function() {
	var summary = {
		'firstName':this.firstName,
		'lastName':this.lastName,
		'url':this.url,
		'email':this.email,
		'bio':this.bio,
		'image':this.image,
		'community':this.community,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('ProfileSchema', ProfileSchema);