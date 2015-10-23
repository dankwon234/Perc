var communityCtr = angular.module('CommunityModule', []);

communityCtr.controller('CommunityController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
  $scope.communities = null;
  $scope.selectedCommunity = null;
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
    RestService.query({resource:'community', id:null}, function(response){
      if (response.confirmation != 'success')
        return;
      
      console.log('Communities == '+JSON.stringify(response));
      $scope.communities = response.communities;
    });
  }

  $scope.createCommunity = function (){
    RestService.post({resource:'community'}, $scope.community, function(response){
      if (response.confirmation != 'success'){
          alert('post request failed');
          return;
      }

      $scope.communities.push(response.community);

      $scope.community = {'name':'', 'website': '', 'description': '', 'url': '', 'image': '', 'password': ''}
      alert('Coummnity Created');
    });
  }

  $scope.selectCommunity = function(community){
    $scope.selectedCommunity = community;

  }

  $scope.onFileSelect = function(files, entity, media){
    uploadService.uploadFiles({'files':files, 'media':media}, function(response, error){
      if (error != null){
        alert(error.message);
        return;
      }
      
      if (media != 'images')
        return;

      var image = response.image;
      console.log(JSON.stringify(image));
      if (entity == 'community')
        $scope.community.image = image.id;
      else
        $scope.selectedCommunity.image = image.id;


   });
  }

  $scope.updateSelectedCommunity = function(){
    RestService.put({resource:'community', id:$scope.selectedCommunity.id}, $scope.selectedCommunity, function(response){
      if (response.confirmation != 'success')
        return;
      
      console.log('updateSelectedCommunity: '+JSON.stringify(response));
  });

  $scope.deleteSelectedCommunity = function(){
    
  }



  }
  
  
  
  
  
  

}]);
