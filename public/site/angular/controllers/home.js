var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.currentCommunity = null;

	
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
		RestService.query({resource:'post', id:null, limit:'0'}, function(response){
			if (response.confirmation != 'success')
				return;
			
			console.log('RECENT POSTS == '+JSON.stringify(response));
		});
	}

	function fetchCommunityPosts(community){
		RestService.query({resource:'post', id:null, communities:community.id}, function(response){
			if (response.confirmation != 'success')
				return;
			
			console.log('COMMUNITY POSTS == '+JSON.stringify(response));
		});
	}
	
	
	
	
	
	

}]);
