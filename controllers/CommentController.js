var Comment = require('../models/Comment.js');
var mongoose = require('mongoose');


this.handleGet = function(req, res, pkg){
	
	// fetch specific company by ID:
	if (pkg.id != null){ 
		Comment.findById(pkg.id, function(err, comment){
			if (err){
				res.json({'confirmation':'fail', 'message':'Comment '+pkg.id+' not found'});
				return;
			}
			
			if (comment == null){
				res.json({'confirmation':'fail', 'message':'Comment '+pkg.id+' not found'});
				return;
			}

			res.json({'confirmation':'success', 'comment':comment.summary()});
		});
		return;
	}
	
	
	/* Query by filters passed into parameter string: */
	Comment.find(req.query, null, {sort:{timestamp:-1}}, function(err, comments) {
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'comments':convertToJson(comments)});
	});
}


// - - - - - - - - - - - - - - - - - - - - POST HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



this.handlePost = function(req, res, pkg){
	Comment.create(req.body, function(err, comment){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'comment':comment.summary()});
	});
}


// - - - - - - - - - - - - - - - - - - - - PUT HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

this.handlePut = function(req, res, pkg){
	
	Comment.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, comment){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'comment':comment.summary()});
		return;
	});
}


// - - - - - - - - - - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function convertToJson(comments){
	var results = new Array();
    for (var i=0; i<comments.length; i++){
  	  var p = comments[i];
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



