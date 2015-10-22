var mongoose = require('mongoose');


var InvitationSchema = new mongoose.Schema({
	from: {type:String, trim:true, default:''},
	to: {type:String, trim:true, default:''},
	message: {type:String, trim:true, default:''},
	community: {type:String, trim:true, default:''},
	timestamp: {type:Date, default:Date.now},
});


InvitationSchema.methods.summary = function() {
	var summary = {
		'from':this.from,
		'to':this.to,
		'community':this.community,
		'message':this.message,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('InvitationSchema', InvitationSchema);