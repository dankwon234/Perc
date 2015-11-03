var postCtr = angular.module('PostModule', []);

postCtr.controller('PostController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.post = null;
	$scope.comment = {'text':'', 'profile':'', 'thread':''};

	
	$scope.init = function(){
		var requestInfo = $scope.generalService.parseLocation('site');
		if (requestInfo.identifier == null)
			return;

		RestService.query({resource:'post', id:requestInfo.identifier}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.post = response.post;
			fetchPostComments();
		});
	}


	function fetchPostComments(){
		RestService.query({resource:'comment', id:null, thread:$scope.post.id}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.post['comments'] = response.comments;
		});
	}

	$scope.submitComment = function(){
		if ($scope.profile.id == null)
			return;

		$scope.comment['profile'] = {'id':$scope.profile.id, 'name':$scope.profile.firstName, 'image':$scope.profile.image};
		$scope.comment['thread'] = $scope.post.id;
		console.log('submitComment: '+JSON.stringify($scope.comment));

	}


	
	
	
	
	

}]);
