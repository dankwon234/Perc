var mongoose = require('mongoose');


var ConversationSchema = new mongoose.Schema({
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	title: {type:String, trim:true, default:''},
	text: {type:String, trim:true, default:''},
	link: {type:String, trim:true, default:''},
	image: {type:String, trim:true, default:'vAcKMGDo'},
	numComments: {type:Number, default:0},
	tags: {type:Array, default:[]},
	timestamp: {type:Date, default:Date.now},
});


ConversationSchema.methods.summary = function() {
	var summary = {
		'profile':this.profile,
		'title':this.title,
		'text':this.text,
		'link':this.link,
		'image':this.image,
		'numComments':this.numComments,
		'tags':this.tags,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('ConversationSchema', ConversationSchema);