var Message = require('../models/Message.js');
var mongoose = require('mongoose');


this.handleGet = function(req, res, pkg){
	
	// fetch specific message by ID:
	if (pkg.id != null){ 
		Message.findById(pkg.id, function(err, message){
			if (err){
				res.json({'confirmation':'fail', 'message':'Message '+pkg.id+' not found'});
				return;
			}
			
			if (message == null){
				res.json({'confirmation':'fail', 'message':'Message '+pkg.id+' not found'});
				return;
			}

			res.json({'confirmation':'success', 'message':message.summary()});
		});
		return;
	}
	

	var params = req.query;
	var limit = params.limit;
	if (limit == null)
		limit = '0';
	
	delete params['limit'];
	
	/* Query by filters passed into parameter string: */
	Message.find(req.query, null, {limit:limit, sort:{timestamp:-1}}, function(err, messages) {
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'messages':convertToJson(messages)});
	});
}


// - - - - - - - - - - - - - - - - - - - - POST HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



this.handlePost = function(req, res, pkg){
	
	Message.create(req.body, function(err, message){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'message':message.summary()});
	});
}


// - - - - - - - - - - - - - - - - - - - - PUT HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

this.handlePut = function(req, res, pkg){
	
	Message.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, message){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'message':message.summary()});
		return;
	});
}


// - - - - - - - - - - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function convertToJson(messages){
	var results = new Array();
    for (var i=0; i<messages.length; i++){
  	  var p = messages[i];
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



