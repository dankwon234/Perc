var profileCtr = angular.module('ProfileModule', []);

profileCtr.controller('ProfileController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.publicProfile = null;
	$scope.comment = {'text':'', 'profile':'', 'thread':''};
	$scope.conversation = {'text':'', 'profile':'', 'board':''};

	
	$scope.init = function(){
		var requestInfo = $scope.generalService.parseLocation('site');
		if (requestInfo.identifier == null)
			return;

		RestService.query({resource:'profile', id:requestInfo.identifier}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.publicProfile = response.profile;
			fetchConversations();
		});
	}

	function fetchConversations(){
		RestService.query({resource:'conversation', id:null, board:$scope.publicProfile.id}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.publicProfile['conversations'] = response.conversations;
		});
	}


	$scope.submitComment = function(){
		if ($scope.profile.id == null)
			return;

		$scope.comment['profile'] = {'id':$scope.profile.id, 'name':$scope.profile.firstName, 'image':$scope.profile.image};
		$scope.comment['thread'] = $scope.post.id;
		console.log('submitComment: '+JSON.stringify($scope.comment));

		RestService.post({resource:'comment', id:null}, $scope.comment, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.post.comments.push(response.comment);
			$scope.comment = {'text':'', 'profile':'', 'thread':''};
		});
	}
	

	$scope.startConversation = function(){
		if ($scope.profile.id == null){
			$scope.conversation['profile'] = {'name':'anonymous', 'image':'vAcKMGDo'};
		}
		else {
			var name = $scope.profile.firstName+' '+$scope.profile.lastName;
			$scope.conversation['profile'] = {'id':$scope.profile.id, 'name':name, 'image':$scope.profile.image};
		}

		$scope.conversation['board'] = $scope.publicProfile.id;

		RestService.post({resource:'conversation', id:null}, $scope.conversation, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.publicProfile.conversations.push(response.conversation);
			$scope.conversation = {'text':'', 'profile':'', 'board':''};
		});
	}

	$scope.viewConversation = function(conversation){
		console.log('viewConversation: '+JSON.stringify(conversation));
		

	}
	
	

}]);
