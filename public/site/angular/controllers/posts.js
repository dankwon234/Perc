var postsCtr = angular.module('PostsModule', []);

postsCtr.controller('PostsController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.selectedPost = null;
	$scope.communities = null;

	
	$scope.init = function(){
		RestService.query({resource:'post', id:null}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.posts = response.posts;
			fetchCommunities();
		});
	}

	$scope.selectPost = function(post){
		$scope.selectedPost = post;

	}

	function fetchCommunities(){
		RestService.query({resource:'community', id:null}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.communities = response.communities;
		});
	}

	$scope.toggleCommunity = function(community){
		if ($scope.selectedPost == null)
			return;

		var index = $scope.selectedPost.communities.indexOf(community.id);
		if (index == -1){
			$scope.selectedPost.communities.push(community.id);
			return;
		}

		$scope.selectedPost.communities.splice(index, 1);
	}

	$scope.updatePost = function(){
		RestService.put({resource:'post', id:$scope.selectedPost.id}, $scope.selectedPost, function(response){
			if (response.confirmation != 'success')
				return;
			
			console.log(JSON.stringify(response));
			alert('Post Updated: ');
		});

	}




}]);
