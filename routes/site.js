var Post = require('../models/Post.js');
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
				res.json({'confirmation':'fail', 'message':'Post '+postId+' not found'});
				return;
			}
			
			if (post == null){
				res.json({'confirmation':'fail', 'message':'Post '+postId+' not found'});
				return;
			}

			var url = 'http://www.getpercs.com/site/post/'+post.id;
			var imageUrl = 'https://media-service.appspot.com/site/images/'+post.image;
			var fbTags = {postTitle:post.title, postImage:imageUrl, postUrl:url, postDescription:post.text};
			res.render('site/'+page, fbTags);
			return;

		});
		return;
	}



	res.render('site/'+page, { title: 'Express' });
});


module.exports = router;
