var communityCtr = angular.module('CommunityModule', []);

communityCtr.controller('CommunityController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {

  $scope.community = { 
    'name':'',
    'website': '',
    'description': '',
    'url': '',
    'image': '',
    'password': ''
  }
  
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

  $scope.createCommunity = function (){
    console.log('create community called:' +JSON.stringify($scope.community));
    RestService.post({resource:'community'}, $scope.community, function(response){
      if (response.confirmation != 'success')
        alert('post request failed');

      

    });

  }

  $scope.onFileSelect = function(files, property, media){

    
    uploadService.uploadFiles({'files':files, 'media':media}, function(response, error){
      
      if (error != null){
        alert(error.message);
        return;
      }
      
      if (media != 'images')
        return;

      var image = response.image;
      console.log(JSON.stringify(image));
      
      $scope.community.image = image.id;
 
      console.log($scope.community);

    });
  }
  
  
  
  
  
  

}]);
