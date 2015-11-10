var postCtr = angular.module('ConversationModule', []);

postCtr.controller('ConversationController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.conversation = null;
	$scope.board = null;
	$scope.comment = {'text':'', 'profile':'', 'thread':''};

	
	$scope.init = function(){
		var requestInfo = $scope.generalService.parseLocation('site');
		if (requestInfo.identifier == null)
			return;

		RestService.query({resource:'conversation', id:requestInfo.identifier}, function(response){
			console.log('ConversationController: '+JSON.stringify(response));
			if (response.confirmation != 'success')
				return;
			
			$scope.conversation = response.conversation;
			fetchConversationComments();
		});
	}


	function fetchConversationComments(){
		RestService.query({resource:'comment', id:null, thread:$scope.conversation.id}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.conversation['comments'] = response.comments;
			fetchConversationBoard();
		});
	}

	function fetchConversationBoard(){
		RestService.query({resource:'profile', id:$scope.conversation.board}, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.board = response.profile;
		});
	}

	$scope.submitReply = function(){
		if ($scope.profile.id == null)
			return;

		$scope.comment['profile'] = {'id':$scope.profile.id, 'name':$scope.profile.firstName, 'image':$scope.profile.image};
		$scope.comment['thread'] = $scope.conversation.id;
		console.log('submitComment: '+JSON.stringify($scope.comment));

		RestService.post({resource:'comment', id:null}, $scope.comment, function(response){
			if (response.confirmation != 'success')
				return;
			
			$scope.conversation.comments.push(response.comment);
			$scope.comment = {'text':'', 'profile':'', 'thread':''};

			$scope.conversation['numComments'] = $scope.conversation.numComments+1;
			RestService.put({resource:'conversation', id:$scope.conversation.id}, $scope.conversation, function(response){
				if (response.confirmation != 'success')
					return;
				
			});


		});
	}
	
	
	

}]);
