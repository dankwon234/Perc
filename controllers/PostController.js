var Post = require('../models/Post.js');
var Community = require('../models/Community.js');
var fs = require('fs');
var Promise = require('bluebird');
var mongoose = require('mongoose');



var fetchCommunities = function(){
	return new Promise(function (resolve, reject){
		Community.find(null, function(err, communities) {
			if (err) {reject(err); }
			else { resolve(communities); }
		});
	});
}



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


this.updatePosts = function(req, res, pkg){


	fetchCommunities()
	.then(function(communities){
		var communitiesArray = [];
		for (var i=0; i<communities.length; i++){
			var community = communities[i];
			communitiesArray.push(community.id);
		}

//		res.json({'confirmation':'success', 'communities':communitiesArray});

		Post.find(req.query, null, {limit:0, sort:{timestamp:-1}}, function(err, posts) {
			console.log('FETCH Posts');
			if (err) {
				res.json({'confirmation':'fail', 'message':err.message});
				return;
			}
			
			for (var j=0; j<posts.length; j++){
				var post = posts[j];
				post['communities'] = communitiesArray;
				post.save();
			}

			res.json({'confirmation':'success', 'posts':convertToJson(posts)});
			return;
		});
		return;
	})
	.catch(function(err){
		res.json({'confirmation':'fail', 'message':err.message});

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
	fetchFile('public/email/post/reply.html')
	.then(function(data){
		var replyHtml = data.replace('{{message}}', reply.text);
		replyHtml = replyHtml.replace('{{firstName}}', reply.profile.firstName.toUpperCase());
		replyHtml = replyHtml.replace('{{lastName}}', reply.profile.lastName.toUpperCase());
		replyHtml = replyHtml.replace('{{image}}', reply.profile.image);
		replyHtml = replyHtml.replace('{{community}}', reply.commnunity);

		var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
		sendgrid.send({
			to:       'dennykwon2@gmail.com',
			from:     'getpercs@gmail.com',
			fromname: 'PERC',
			cc: 	  'dan.kwon234@gmail.com',
			subject:  reply.subject,
			html:     replyHtml
		}, function(err, json) {
			if (err) {
				res.json({'confirmation':'fail', 'message':err.message});
				return;
			}

			res.json({'confirmation':'success', 'message':'Your message has been sent!'});
			return;
		});
	})
	.catch(function(err){
		res.json({'confirmation':'fail', 'message':err.message});
		return;
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

var fetchFile = function(path){
	return new Promise(function (resolve, reject){
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {reject(err); }
			else { resolve(data); }
		});
	});
}

