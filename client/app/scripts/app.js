'use strict';
(function(){
	function MainController($scope, $rootScope){
		$rootScope.$on('user:login', function(data){
			console.log('User logged in');
			$scope.logged = true;
		});
		$rootScope.$on('user:logout', function(data){
			console.log('User not logged in');
			$scope.logged = false;
		})
	}

	// Adding the dependencies of the app
	angular.module('myApp', [
	  'ngRoute',
	  'myApp.directives',
	  'myApp.views',
	  'myApp.services'
	]).
	config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/home'});
	}]).
	controller('MainController', MainController);
})();