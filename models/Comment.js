var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
	text: {type:String, trim:true, default:''},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	thread: {type:String, default:''},
	timestamp: {type:Date, default:Date.now},
});


CommentSchema.methods.summary = function() {
	var summary = {
		'profile':this.profile,
		'text':this.text,
		'thread':this.thread,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('CommentSchema', CommentSchema);
