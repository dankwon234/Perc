var homeCtr = angular.module('AccountModule', []);

homeCtr.controller('AccountController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.currentCommunity = null;

	$scope.init = function(){
		console.log('AccountController: INIT');
		if ($scope.profile.id != null){
			fetchProfileCommunity();
			return;
		}

		// BaseController checks for current user. If found, this listener gets trieggered:
		$scope.$watch('profile', function(newValue, oldValue){
			fetchProfileCommunity();
		}, true);
	}

	function fetchProfileCommunity(){
		RestService.query({resource:'community', id:$scope.profile.communities[0]}, function(response){
			console.log('AccountController: fetchProfileCommunity - '+JSON.stringify(response));
			if (response.confirmation != 'success')
				return;

			$scope.currentCommunity = response.community;
		});
	}
	

}]);
