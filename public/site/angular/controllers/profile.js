var profileCtr = angular.module('ProfileModule', []);

profileCtr.controller('ProfileController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.publicProfile = null;
	$scope.comment = {'text':'', 'profile':'', 'thread':''};

	
	$scope.init = function(){
		var requestInfo = $scope.generalService.parseLocation('site');
		if (requestInfo.identifier == null)
			return;

		RestService.query({resource:'profile', id:requestInfo.identifier}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.publicProfile = response.profile;
		});
	}


	$scope.submitComment = function(){
		if ($scope.profile.id == null)
			return;

		$scope.comment['profile'] = {'id':$scope.profile.id, 'name':$scope.profile.firstName, 'image':$scope.profile.image};
		$scope.comment['thread'] = $scope.post.id;
		console.log('submitComment: '+JSON.stringify($scope.comment));

		RestService.post({resource:'comment', id:null}, $scope.comment, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.post.comments.push(response.comment);
			$scope.comment = {'text':'', 'profile':'', 'thread':''};
		});
	}
	
	
	

}]);
