'use strict';

(function(){
	/******
	 * Home Controller, only to show some content after login
	 */
	var listLogController = function($scope, ListAuthenticationService){
		// var scope = this;
		$scope.logs=[];

		ListAuthenticationService.logs().then(function(data){
			console.log(data);
			$scope.logs = data;
		});
		
	};

	angular.module('myApp.views', ['ngRoute'])

	.config(function($routeProvider) {
	  $routeProvider.when('/list', {
	    templateUrl: 'scripts/views/listLog/logs.html',
	    controller: 'ListLogController'
	  });
	})


	.controller('ListLogController', listLogController);
})();