var postCtr = angular.module('PostModule', []);

postCtr.controller('PostController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.post = null;

	
	$scope.init = function(){
		var requestInfo = $scope.generalService.parseLocation('site');
		if (requestInfo.identifier == null)
			return;

		RestService.query({resource:'post', id:requestInfo.identifier}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.post = response.post;
		});
	}


	
	
	
	
	

}]);
