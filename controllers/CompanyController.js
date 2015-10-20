var Company = require('../models/Company.js');
var mongoose = require('mongoose');


this.handleGet = function(req, res, pkg){
	console.log('Company CONTROLLER: Handle GET');
	
	// fetch specific company by ID:
	if (pkg.id != null){ 
		Company.findById(pkg.id, function(err, company){
			if (err){
				res.json({'confirmation':'fail', 'message':'Company '+pkg.id+' not found'});
				return;
			}
			
			if (company==null){
				res.json({'confirmation':'fail', 'message':'Company '+pkg.id+' not found'});
				return;
			}

			res.json({'confirmation':'success', 'company':company.summary()});
		});
		return;
	}
	
	
	/* Query by filters passed into parameter string: */
	Company.find(req.query, function(err, companies) {
		console.log('FETCH Companies');
		if (err) {
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
		res.json({'confirmation':'success', 'companies':convertToJson(companies)});
	});
}


// - - - - - - - - - - - - - - - - - - - - POST HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



this.handlePost = function(req, res, pkg){
	console.log('Company CONTROLLER: Handle POST: '+JSON.stringify(req.body));
	
	Company.create(req.body, function(err, company){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'company':company.summary()});
	});
}


// - - - - - - - - - - - - - - - - - - - - PUT HANDLER - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

this.handlePut = function(req, res, pkg){
	
	Company.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, company){
		if (err){
			res.json({'confirmation':'fail', 'message':err.message});
			return;
		}
		
	  	res.json({'confirmation':'success', 'company':company.summary()});
		return;
	});
}


// - - - - - - - - - - - - - - - - - - - - MISC - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function convertToJson(companies){
	var results = new Array();
    for (var i=0; i<companies.length; i++){
  	  var p = companies[i];
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



