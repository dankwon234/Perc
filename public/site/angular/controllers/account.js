var homeCtr = angular.module('AccountModule', []);

homeCtr.controller('AccountController', ['$scope', 'accountService', 'generalService', 'uploadService', 'RestService', function($scope, accountService, generalService, uploadService, RestService) {
	$scope.currentCommunity = null;

	$scope.init = function(){
		console.log('AccountController: INIT');

	}
	

}]);
