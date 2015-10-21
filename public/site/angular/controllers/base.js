var baseCtr = angular.module('BaseModule', []);

baseCtr.controller('BaseController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.profile = {
		'firstName': '',
		'lastName': '',
		'email': '',
		'password': ''
	}
	$scope.credentials = {'email':'', 'password':'', 'name':''};
	$scope.loading = false;

	
	$scope.register = function(){
		console.log('register called');
		accountService.register($scope.profile, function(response, error){
			console.log(JSON.stringify(response));
			if (error != null){
                alert(error.message);
				return;
			}
			$scope.profile = {'firstName':'', 'lastName':'', 'email':'', 'password':''};
		});
	}
	
	$scope.login = function(){
		$scope.loading = true;
		accountService.login($scope.credentials, function(response, error){
			if (error != null){
				$scope.loading = false;
                alert(error.message);
				return;
			}
			
			window.location.href = '/site/forum';
		});
	}
	
	
	
	
	

}]);
