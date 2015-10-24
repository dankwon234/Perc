var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.currentCommunity = null;
	$scope.post = {'text':'', 'title':'', 'communities':[], 'type':'job', 'profile':'', 'tags':[], 'contact':'', 'image':''};
	$scope.posts = null;

	
	$scope.init = function(){
		console.log('HomeController: INIT');
		accountService.checkCurrentUser(function(response){
			if (response.confirmation != 'success'){
				fetchFeaturedPosts();
				return;
			}

			$scope.profile = response.profile;
			if ($scope.profile.communities.length > 0){
				fetchCommunity($scope.profile.communities[0]);
				return;
			}

			fetchFeaturedPosts();
		});
	}

	function fetchCommunity(communityId){
		RestService.query({resource:'community', id:communityId}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.currentCommunity = response.community;
			fetchCommunityPosts($scope.currentCommunity);
		});
	}



	function fetchFeaturedPosts(){
		RestService.query({resource:'post', id:null, featured:'yes'}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.posts = response.posts;
		});
	}

	function fetchCommunityPosts(community){
		RestService.query({resource:'post', id:null, communities:community.id}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.posts = response.posts;
		});
	}

	$scope.createPost = function(){
		if ($scope.currentCommunity == null)
			return;

		if ($scope.profile.id == null)
			return;

		$scope.post.communities.push($scope.currentCommunity.id);
		$scope.post['profile'] = $scope.profile.id;

		RestService.post({resource:'post', id:null}, $scope.post, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.posts.unshift(response.post);
			$scope.post = {'text':'', 'title':'', 'communities':[], 'type':'job', 'profile':'', 'tags':[], 'contact':'', 'image':''};
		});
	}
	
	
  	$scope.uploadImage = function(files, entity, media){
	    uploadService.uploadFiles({'files':files, 'media':media}, function(response, error){
	    	if (error != null){
	    		alert(error.message);
	    		return;
	    	}

	    	if (media != 'images')
	    		return;

		    var image = response.image;
		    $scope.post['image'] = image.id;
	    });
  	}
	
	
	
	
	

}]);
