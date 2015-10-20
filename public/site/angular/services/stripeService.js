var restService = angular.module('StripeServiceModule', ['ngResource']);

restService.factory('StripeService', ['$resource', function($resource){
	return $resource('/stripe/:resource/:id', {}, {
		
		query: { method:'GET', params:{}, isArray:false },
		get: { method:'GET'},
		post: { method:'POST'},
		put: { method:'PUT'},
		update: { method:'PUT' }
		
		// override methods:
	  // { 'get':    {method:'GET'},
	  //   'save':   {method:'POST'},
	  //   'query':  {method:'GET', isArray:true},
	  //   'remove': {method:'DELETE'},
	  //   'delete': {method:'DELETE'} };
		
    });
}]);