var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
	text: {type:String, trim:true, default:''},
	title: {type:String, trim:true, default:''},
	image: {type:String, trim:true, default:'vAcKMGDo'},
	contact: {type:String, trim:true, default:''}, // email, phone number
	featured: {type:String, trim:true, default:'no'},
	communities: {type:Array, default:[]},
	type: {type:String, trim:true, lowercase:true, default:''}, // job, event, etc
 	link: {type:String, trim:true, lowercase:true, default:''},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	numComments: {type:Number, default:0},
	tags: {type:Array, default:[]},
	viewed: {type:Array, default:[]},
	thread: {type:String, default:''},
	timestamp: {type:Date, default:Date.now},
});


PostSchema.methods.summary = function() {
	var summary = {
		'profile':this.profile,
		'text':this.text,
		'featured':this.featured,
		'type':this.type,
		'contact':this.contact,
		'communities':this.communities,
		'numComments':this.numComments,
		'link':this.link,
		'title':this.title,
		'image':this.image,
		'thread':this.thread,
		'tags':this.tags,
		'viewed':this.viewed,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('PostSchema', PostSchema);