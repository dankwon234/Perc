var Post = require('../models/Post.js');
var mongoose = require('mongoose');


this.handleGet = function(req, res, pkg){
	console.log('Post CONTROLLER: Handle GET');
	
	// fetch specific post by ID:
	if (pkg.id != null){ 
		Post.findById(pkg.id, function(err, post){
			if (err){
				res.json({'confirmation':'fail', 'message':'Post '+pkg.id+' not found'});
				return;
			}
			
			if (post == null){
				res.json({'confirmation':'fail', 'message':'Post '+pkg.id+' not found'});
				return;
			}

			res.json({'confirmation':'success', 'post':post.summary()});
		});
		return;
	}
	

	var params = req.query;
	var limit = params.limit;
	if (limit == null)
		limit = '0';
	
	delete params['limit'];
	
	/* Query by filters passed into parameter string: */
	Post.find(req.query, null, {limit:limit, sort:{timestamp:-1}}, function(err, posts) {
		console.log('FETCH Posts');
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'posts':convertToJson(posts)});
	});
}


// - - - - - - - - - - - - - - - - - - - - POST HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



this.handlePost = function(req, res, pkg){
	console.log('POST CONTROLLER: Handle POST: '+JSON.stringify(req.body));
	
	Post.create(req.body, function(err, post){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'post':post.summary()});
	});
}


this.replyToPost = function(req, res, pkg){

	var reply = req.body;

	var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
	sendgrid.send({
		to:       'dennykwon2@gmail.com',
//		to:       '6tgks-5278228114@hous.craigslist.org',
		from:     'getpercs@gmail.com',
		fromname: 'PERC',
		cc: 	  'dan.kwon234@gmail.com',
		subject:  reply.subject,
		text:     reply.text
	}, function(err, json) {
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}

		res.json({'confirmation':'success', 'message':'Your message has been sent!'});
	});


}


// - - - - - - - - - - - - - - - - - - - - PUT HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

this.handlePut = function(req, res, pkg){
	
	Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, post){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'post':post.summary()});
		return;
	});
}


// - - - - - - - - - - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function convertToJson(posts){
	var results = new Array();
    for (var i=0; i<posts.length; i++){
  	  var p = posts[i];
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



