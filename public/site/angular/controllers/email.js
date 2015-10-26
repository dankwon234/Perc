var app = angular.module('EmailModule', []);

app.controller('EmailController', ['$scope', 'generalService', 'accountService', 'uploadService', 'RestService', function($scope, generalService, accountService, uploadService, RestService) {
	$scope.recipients = [];
	$scope.recipientsString = '';

	
	$scope.init = function(){

	}
	
	$scope.sendEmail = function(){
		if ($scope.recipientsString.length == 0){
			alert('Include at least one recipient.');
			return;
		}
		
		var r = $scope.recipientsString.split(',');
		for (var i=0; i<r.length; i++){
			var email = r[i];
			$scope.recipients.push(email.trim());
		}
		
		if ($scope.recipients.length == 0){
			alert('Include at least one recipient.');
			return;
		}
		
		var pkg = {'recipients':$scope.recipients};
		console.log('SEND EMAILS: '+JSON.stringify(pkg));
		
		RestService.post({resource:'email', id:null}, pkg, function(response){
			console.log('EMAIL CONTROLLER == '+JSON.stringify(response));
			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}
			
			$scope.recipientsString = '';
			$scope.recipients = [];
			alert('Emails Sent');
		});
	}
	
	
	
	
	

}]);
