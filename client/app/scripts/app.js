'use strict';
(function(){
	//Logout of the system and redirect to the main screen
	function logoutController($location, SessionServices) {
	    SessionServices.destroy();
	    $location.path('/home');
	}

	//Main Controller
	function mainController($scope, $rootScope){
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
	])
	.config(function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/home'});
	})
	.config(function($routeProvider) {
	 	$routeProvider.when('/logout', {
		    template: '',
		    controller: 'LogoutController'
	 	});
	})
	.controller('LogoutController', logoutController)
	.controller('MainController', mainController);
})();