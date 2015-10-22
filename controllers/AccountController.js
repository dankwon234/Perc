var Profile = require('../models/Profile.js');
var mongoose = require('mongoose');


this.checkCurrentUser = function(req, res){
	if (!req.session){
		res.send({'confirmation':'fail', 'message':'User not logged in.'});
		return;
	}

	if (!req.session.user){
		res.send({'confirmation':'fail', 'message':'User not logged in.'});
		return;
	}
	
	var userId = req.session.user;
	console.log('USER '+userId+' LOGGED IN');
	
	Profile.findById(userId, function(err, profile){
		if (err){
			req.session.reset();
			res.send({'confirmation':'fail', 'message':'Profile '+userId+' not found'});
			return;
		}
		
		if (profile==null){
			res.send({'confirmation':'fail', 'message':'Profile '+userId+' not found'});
			return;
		}

		res.json({'confirmation':'success', 'profile':profile.summary()});
	});
}



// - - - - - - - - - - - - - - - - - - - - LOGIN AND LOGOUT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


this.handleLogin = function(req, res, pkg){
	
	Profile.find({'email':req.body.email}, function(err, profiles) {
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		if (profiles.length == 0){
			res.json({'confirmation':'fail', 'message':'Profile '+req.body.email+' not found.'});
			return;
		}
		
		var profile = profiles[0]; // assume first one
		if (profile.password != req.body.password){
			res.json({'confirmation':'fail', 'message':'Incorrect Password'});
			return;
		}
	
	
		req.session.user = profile._id; // install cookie with profile id set to 'user'
		res.json({'confirmation':'success', 'profile':profile.summary()});
		return;
	});
}

this.handleLogout = function(req, res, pkg){
	req.session.reset();
  	res.json({'confirmation':'success'});
}



function convertToJson(profiles){
	var results = new Array();
    for (var i=0; i<profiles.length; i++){
  	  var p = profiles[i];
  	  results.push(p.summary());
    }
	
	return results;
}



