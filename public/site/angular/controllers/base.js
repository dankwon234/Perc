var baseCtr = angular.module('BaseModule', []);

baseCtr.controller('BaseController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope['generalService'] = generalService;
	$scope.credentials = {'email':'', 'password':'', 'name':''};
	$scope.loading = false;
	$scope.profile = {
		'id':null,
		'firstName': '',
		'lastName': '',
		'email': '',
		'password': ''
	}

	$scope.checkCurrentUser = function(){
		accountService.checkCurrentUser(function(response){
			if (response.confirmation == 'success')
				$scope.profile = response.profile;
		});
	}

	$scope.updateProfile = function(){
		accountService.updateProfile($scope.profile, function(response){
			if (response.confirmation == 'success')
				$scope.profile = response.profile;

			console.log('update profile: '+JSON.stringify($scope.profile));
		});

	}

	$scope.register = function(){
		console.log('register called');
		delete $scope.profile['id'];
		accountService.register($scope.profile, function(response, error){
			console.log(JSON.stringify(response));
			if (error != null){
                alert(error.message);
				return;
			}

			window.location.href = '/site/communities';
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
			
			window.location.href = '/site/account';
		});
	}

	$scope.logout = function(){
		accountService.logout(function(response, error){
			if (error != null){
				$scope.loading = false;
                alert(error.message);
				return;
			}
			
			window.location.href = '/';
		});
	}
	
  	$scope.profileImageSelected = function(files, property, media){
	    uploadService.uploadFiles({'files':files, 'media':media}, function(response, error){
	    	if (error != null){
	    		alert(error.message);
	    		return;
	    	}

	    	if (media != 'images')
	    		return;

		    var image = response.image;
		    $scope.profile['image'] = image.id;
		    $scope.updateProfile();
	    });
  	}
	
	
	
	

}]);
