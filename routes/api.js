var express = require('express');
var router = express.Router();
var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
var accountController = require('../controllers/AccountController.js');
var profileController = require('../controllers/ProfileController.js');
var companyController = require('../controllers/CompanyController.js');
var communityController = require('../controllers/CommunityController.js');
var postController = require('../controllers/PostController.js');
var controllers = {
	'profile':profileController,
	'post':postController,
	'community':communityController,
	'company':companyController
};


var fetchFile = function(path){
	return new Promise(function (resolve, reject){
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {reject(err); }
			else { resolve(data); }
		});
	});
}


router.get('/:resource', function(req, res, next) {
	if (req.params.resource == 'currentuser'){ // check if current user is logged in
		accountController.checkCurrentUser(req, res);
		return;
	}

	if (req.params.resource == 'logout'){
		accountController.handleLogout(req, res, null);
		return;
	}

	if (req.params.resource == 'email'){
		fetchFile('public/email/intro/email.html')
		.then(function(data){
			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
			sendgrid.send({
				to:       'dennykwon2@gmail.com',
				from:     'getpercs@gmail.com',
				fromname: 'Perc',
				subject:  'TEST',
				html:     data
			}, function(err, json) {
				if (err) { }
			});
		
			res.json({'confirmation':'success', 'message':'Email sent to dennykwon2@gmail.com.'});
			return;
		})
		.catch(function(err){
			res.json({'confirmation':'fail','message':err.message});
			return;
		});



		return;
	}

	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	
	controller.handleGet(req, res, {'id':null, 'parameters':req.query});
});


router.get('/:resource/:id', function(req, res, next) {
	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	
	controller.handleGet(req, res, {'id':req.params.id, 'parameters':req.query});
});


router.post('/:resource', function(req, res, next) {

	if (req.params.resource == 'email'){
		var recipients = req.body.recipients;
		if (recipients == null){
			res.json({'confirmation':'fail','message':'Missing recipients parameter.'});
			return;
		}

		if (recipients.length == 0){
			res.json({'confirmation':'fail','message':'There are no recipients.'});
			return;
		}
		
		recipients.push('dennykwon2@gmail.com');
		
		fetchFile('public/email/videoseries/email.html')
		.then(function(data){
			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
			for (var i=0; i<recipients.length; i++){
				sendgrid.send({
					to:       recipients[i],
					from:     'getpercs@gmail.com',
					fromname: 'Perc',
					subject:  'Introducing Perc',
					html:     data
				}, function(err, json) {
					if (err) { }
				});
			}
		
			res.json({'confirmation':'success', 'message':'Email sent to '+recipients});
			return;
		})
		.catch(function(err){
			res.json({'confirmation':'fail','message':err.message});
			return;
		});
		
		return;
	}


	if (req.params.resource == 'login'){
		accountController.handleLogin(req, res, null);
		return;
	}

	if (req.params.resource == 'reply'){
		postController.replyToPost(req, res, null);
		return;
	}
	
	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	
	controller.handlePost(req, res, {'id':null, 'parameters':req.query});
});


router.put('/:resource/:id', function(req, res, next) {
	var controller = controllers[req.params.resource];
	if (controller == null){
		res.send({'confirmation':'fail', 'message':'Invalid Resource: '+req.params.resource});
		return;
	}
	
	if (req.params.id == null){
		res.send({'confirmation':'fail', 'message':'Missing resource identiifer.'});
		return;
	}
	
	controller.handlePut(req, res, {'id':req.params.id, 'parameters':req.query});
	
});






module.exports = router;
