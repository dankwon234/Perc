var communitiesCtr = angular.module('CommunitiesModule', []);

communitiesCtr.controller('CommunitiesController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
    $scope.communities = null;


    $scope.init = function(){
        RestService.query({resource:'community', id:null}, function(response){
            if (response.confirmation != 'success')
                return;
            
            $scope.communities = response.communities;
            console.log('CommunitiesController: '+JSON.stringify($scope.communities));
        });
    }

    $scope.joinCommunity = function(community){
    	if ($scope.profile.id == null)
    		return;

    	if ($scope.profile.communities.indexOf(community.id) != -1){ // already a member
    		window.location.href = '/';
    		return;
    	}

    	$scope.profile.communities.unshift(community.id); // add at top of array
    	accountService.updateProfile($scope.profile, function(){
	    	community['numMembers'] = community.numMembers+1;
	        RestService.put({resource:'community', id:community.id}, community, function(response){
	            if (response.confirmation != 'success')
	                return;
	            
	            console.log('CommunitiesController: '+JSON.stringify(response));
	            window.location.href = '/';
	        });

    	});
    }


  
  
  
  
  

}]);
