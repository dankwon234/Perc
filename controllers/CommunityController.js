var Community = require('../models/Community.js');
var mongoose = require('mongoose');


this.handleGet = function(req, res, pkg){
	console.log('Company CONTROLLER: Handle GET');
	
	// fetch specific company by ID:
	if (pkg.id != null){ 
		Community.findById(pkg.id, function(err, community){
			if (err){
				res.json({'confirmation':'fail', 'message':'Community '+pkg.id+' not found'});
				return;
			}
			
			if (community == null){
				res.json({'confirmation':'fail', 'message':'Community '+pkg.id+' not found'});
				return;
			}

			res.json({'confirmation':'success', 'community':community.summary()});
		});
		return;
	}
	
	
	/* Query by filters passed into parameter string: */
	Community.find(req.query, null, {sort:{timestamp:-1}}, function(err, communities) {
		console.log('FETCH Companies');
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'communities':convertToJson(communities)});
	});
}


// - - - - - - - - - - - - - - - - - - - - POST HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



this.handlePost = function(req, res, pkg){
	console.log('Company CONTROLLER: Handle POST: '+JSON.stringify(req.body));
	
	Community.create(req.body, function(err, community){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'community':community.summary()});
	});
}


// - - - - - - - - - - - - - - - - - - - - PUT HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

this.handlePut = function(req, res, pkg){
	
	Community.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, community){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'community':community.summary()});
		return;
	});
}


// - - - - - - - - - - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function convertToJson(communities){
	var results = new Array();
    for (var i=0; i<communities.length; i++){
  	  var p = communities[i];
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



