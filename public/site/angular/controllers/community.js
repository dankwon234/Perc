var communityCtr = angular.module('CommunityModule', []);

communityCtr.controller('CommunityController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {

  
  $scope.init = function(){
    console.log('CommunityController: INIT');

    accountService.checkCurrentUser(function(response){
      if (response.confirmation == 'success')
        $scope.profile = response.profile;
      fetchCommunities();
    });
  }

  function fetchCommunities(){
    RestService.query({resource:'community'}, function(response){
      if (response.confirmation != 'success')
        return;
      
      console.log('Communities == '+JSON.stringify(response));
    });
  }
  
  
  
  
  
  

}]);
