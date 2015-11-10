var Post = require('../models/Post.js');
var Conversation = require('../models/Conversation.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:page', function(req, res, next) {
	
	var page = req.params.page;
	res.render('site/'+page, { title: 'Express' });
});


router.get('/:page/:id', function(req, res, next) {
	
	var page = req.params.page;

	if (page == 'post'){ // special handler for post page for facebook tags
		var postId = req.params.id;
		Post.findById(postId, function(err, post){
			if (err){
				res.render('site/'+page, {});
				return;
			}
			
			if (post == null){
				res.render('site/'+page, {});
				return;
			}

			var url = 'http://www.getpercs.com/site/post/'+post.id;
			var imageUrl = 'https://media-service.appspot.com/site/images/'+post.image+'?crop=360';
			var fbTags = {postTitle:post.title, postImage:imageUrl, postUrl:url, postDescription:post.text};
			res.render('site/'+page, fbTags);
			return;

		});
		return;
	}


	if (page == 'conversation'){ // special handler for conversation page for facebook tags
		var conversationId = req.params.id;

		Conversation.findById(conversationId, function(err, conversation){
			if (err){
				res.render('site/'+page, {});
				return;
			}
			
			if (conversation == null){
				res.render('site/'+page, {});
				return;
			}

			var url = 'http://www.getpercs.com/site/conversation/'+conversation.id;
			var imageUrl = 'https://media-service.appspot.com/site/images/vAcKMGDo?crop=360';
			var text = conversation.text;
			if (text > 150)
				text = text.substring(0, 150)+'...';

			var fbTags = {postTitle:conversation.title, postImage:imageUrl, postUrl:url, postDescription:text};
			res.render('site/'+page, fbTags);
			return;
		});

		return;
	}

	res.render('site/'+page, { });
});


module.exports = router;
