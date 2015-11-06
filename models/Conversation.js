var mongoose = require('mongoose');


var ConversationSchema = new mongoose.Schema({
	profile: {type:mongoose.Schema.Types.Mixed, default:{}}, // author of the conversation - whoever started it.
	board: {type:String, trim:true, default:''}, // the wall the conversation belongs to
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
		'board':this.board,
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