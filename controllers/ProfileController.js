var Profile = require('../models/Profile.js');
var mongoose = require('mongoose');


this.handleGet = function(req, res, pkg){
	console.log('PROFILE CONTROLLER: Handle GET');
	
	// fetch specific profile by ID:
	if (pkg.id != null){ 
		Profile.findById(pkg.id, function(err, profile){
			if (err){
				res.json({'confirmation':'fail', 'message':'Profile '+pkg.id+' not found'});
				return;
			}
			
			if (profile==null){
				res.json({'confirmation':'fail', 'message':'Profile '+pkg.id+' not found'});
				return;
			}

			res.json({'confirmation':'success', 'profile':profile.summary()});
		});
		return;
	}
	
	
	/* Query by filters passed into parameter string: */
	Profile.find(req.query, function(err, profiles) {
		console.log('FETCH PROFILES');
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'profiles':convertToJson(profiles)});
	});
}


// - - - - - - - - - - - - - - - - - - - - POST HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



this.handlePost = function(req, res, pkg){
	console.log('PROFILE CONTROLLER: Handle POST: '+JSON.stringify(req.body));
	
	Profile.create(req.body, function(err, profile){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		req.session.user = profile._id; // install cookie with profile id set to 'user'
	  	res.json({'confirmation':'success', 'profile':profile.summary()});
	});
}


// - - - - - - - - - - - - - - - - - - - - PUT HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

this.handlePut = function(req, res, pkg){
	
	Profile.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, profile){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'profile':profile.summary()});
		return;
	});
}


// - - - - - - - - - - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function convertToJson(profiles){
	var results = new Array();
    for (var i=0; i<profiles.length; i++){
  	  var p = profiles[i];
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



