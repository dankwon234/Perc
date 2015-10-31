var mongoose = require('mongoose');


var MessageSchema = new mongoose.Schema({
	sender: {type:String, trim:true, default:''},
	recipient: {type:String, trim:true, default:''},
	thread: {type:String, trim:true, default:''},
	text: {type:String, trim:true, default:''},
	image: {type:String, trim:true, default:''},
	timestamp: {type:Date, default:Date.now},
});


MessageSchema.methods.summary = function() {
	var summary = {
		'sender':this.sender,
		'recipient':this.recipient,
		'thread':this.thread,
		'text':this.text,
		'image':this.image,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('MessageSchema', MessageSchema);