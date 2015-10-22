var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
	text: {type:String, trim:true, default:''},
	title: {type:String, trim:true, default:''},
	type: {type:String, trim:true, lowercase:true, default:''}, // job, event, etc
 	link: {type:String, trim:true, lowercase:true, default:''},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	numComments: {type:Number, default:0},
	tags: {type:Array, default:[]},
	thread: {type:String, default:''},
	timestamp: {type:Date, default:Date.now},
});


PostSchema.methods.summary = function() {
	var summary = {
		'profile':this.profile,
		'text':this.text,
		'type':this.type,
		'numComments':this.numComments,
		'link':this.link,
		'title':this.title,
		'thread':this.thread,
		'tags':this.tags,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('PostSchema', PostSchema);