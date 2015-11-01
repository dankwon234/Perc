var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.currentCommunity = null;
	$scope.post = {'text':'', 'title':'', 'communities':[], 'type':'job', 'profile':'', 'tags':[], 'contact':'', 'image':'vAcKMGDo'};
	$scope.posts = null;
	$scope.selectedPost = null;
	$scope.reply = {'text':'', 'subject':'', 'sender':'', 'recpient':''};
	$scope.visiblePosts = []; // only show 4 posts at a time
	$scope.pages = [];


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
			$scope.loadVisiblePosts(0);
			paginate();
		});
	}

	function fetchCommunityPosts(community){
		RestService.query({resource:'post', id:null, communities:community.id}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.posts = response.posts;
			$scope.loadVisiblePosts(0);
			paginate();
			fetchCommunityProfiles($scope.currentCommunity);
		});
	}

	function fetchCommunityProfiles(community){
		RestService.query({resource:'profile', id:null, communities:community.id}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.currentCommunity['profiles'] = response.profiles;
			console.log('fetchCommunityProfiles: '+JSON.stringify($scope.currentCommunity.profiles));
		});

	}

	$scope.loadVisiblePosts = function(index){
		console.log('loadVisiblePosts: '+index);
		var max = index+6;
		if (max >= $scope.posts.length)
			max = $scope.posts.length;

		$scope.visiblePosts = [];
		for (var i=index; i<max; i++)
			$scope.visiblePosts.push($scope.posts[i]);
	}


	function paginate(){
		for (var i=0; i<$scope.posts.length; i++){
			if (i%6 != 0)
				continue;

			$scope.pages.push(i);
		}
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
			$scope.loadVisiblePosts(0);
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

  	$scope.selectPost = function(post){
		$scope.selectedPost = post;
  	}

  	$scope.unselectPost = function(){
		$scope.selectedPost = null;
		$scope.reply = {'text':'', 'subject':''};
  	}

  	$scope.replyToPost = function(){
		if ($scope.profile.id == null)
			return;

		$scope.reply['sender'] = $scope.profile.id;
		$scope.reply['recipent'] = $scope.selectedPost.profile.id;
		$scope.reply['subject'] = $scope.selectedPost.title;

		RestService.post({resource:'reply', id:null}, $scope.reply, function(response){
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			$scope.unselectPost();
			alert('Your message has been sent!');
		});

  	}
	
	
	
	
	

}]);
