'use strict';

(function(){
	/******
	 * Home Controller, only to show some content after login
	 */
	var homeController = function($scope){
		// var scope = this;
		$scope.title="Welcome Home";
		
	};

	angular.module('myApp.views', ['ngRoute'])

	.config(function($routeProvider) {
	  $routeProvider.when('/home', {
	    templateUrl: 'scripts/views/home/homeView.html',
	    controller: 'HomeController'
	  });
	})


	.controller('HomeController', homeController);
})();