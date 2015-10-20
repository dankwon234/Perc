var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {

	
	$scope.init = function(){
		console.log('HomeController: INIT');

		accountService.checkCurrentUser(function(response){
			if (response.confirmation == 'success')
				$scope.profile = response.profile;
			fetchPosts();
		});
	}

	function fetchPosts(){
		RestService.query({resource:'post', id:null, limit:'0'}, function(response){
			if (response.confirmation != 'success')
				return;
			
			console.log('RECENT POSTS == '+JSON.stringify(response));
		});
	}
	
	
	
	
	
	

}]);
