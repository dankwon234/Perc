var Conversation = require('../models/Conversation.js');
var mongoose = require('mongoose');


this.handleGet = function(req, res, pkg){
	
	// fetch specific company by ID:
	if (pkg.id != null){ 
		Conversation.findById(pkg.id, function(err, conversation){
			if (err){
				res.json({'confirmation':'fail', 'message':'Conversation '+pkg.id+' not found'});
				return;
			}
			
			if (conversation == null){
				res.json({'confirmation':'fail', 'message':'Conversation '+pkg.id+' not found'});
				return;
			}

			res.json({'confirmation':'success', 'conversation':conversation.summary()});
		});
		return;
	}
	
	
	/* Query by filters passed into parameter string: */
	Conversation.find(req.query, null, {sort:{timestamp:-1}}, function(err, conversations) {
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'conversations':convertToJson(conversations)});
	});
}


// - - - - - - - - - - - - - - - - - - - - POST HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



this.handlePost = function(req, res, pkg){
	Conversation.create(req.body, function(err, conversation){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'conversation':conversation.summary()});
	});
}


// - - - - - - - - - - - - - - - - - - - - PUT HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

this.handlePut = function(req, res, pkg){
	Conversation.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, conversation){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'conversation':conversation.summary()});
		return;
	});
}


// - - - - - - - - - - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function convertToJson(conversations){
	var results = new Array();
    for (var i=0; i<conversations.length; i++){
  	  var p = conversations[i];
  	  results.push(p.summary());
    }
	
	return results;
}

function randomString(limit){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i <limit; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



