var communitiesCtr = angular.module('CommunitiesModule', []);

communitiesCtr.controller('CommunitiesController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
    $scope.communities = null;
    $scope.selectedCommunity = null;


    $scope.init = function(){
        RestService.query({resource:'community', id:null}, function(response){
            if (response.confirmation != 'success')
                return;
            
            $scope.communities = response.communities;
            $scope.selectedCommunity = $scope.communities[0];
        });
    }

    $scope.selectCommunity = function(community){
        $scope.selectedCommunity = community;
        document.getElementById('topAnchor').click();
    }
    

    $scope.joinCommunity = function(community){
    	if ($scope.profile.id == null)
    		return;

    	if ($scope.profile.communities.indexOf(community.id) != -1){ // already a member
    		window.location.href = '/';
    		return;
    	}

        $scope.profile['communities'] = [community.id] // for now, can only join one comminity
    	accountService.updateProfile($scope.profile, function(){
	    	community.members.push($scope.profile.id);
	        RestService.put({resource:'community', id:community.id}, community, function(response){
	            if (response.confirmation != 'success')
	                return;
	            
	            console.log('CommunitiesController: '+JSON.stringify(response));
	            window.location.href = '/';
	        });
    	});
    }


  
  
  
  
  

}]);
