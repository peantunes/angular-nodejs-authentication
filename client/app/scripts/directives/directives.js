'use strict';

(function(){
	/**
	* Directive code
	*/
	function loginDirective(){
		return {
			restrict:'E',
			scope:{

			},
			templateUrl: 'scripts/directives/template/login-form.html'
		}
	}

	function loginController($scope, LoginServices){
		$scope.credentials = {
			user: '',
			password: ''
		};
		$scope.login = function () {
			$scope.error = "";
			if ($scope.credentials.user == ""){
				$scope.error = "User Invalid";
				return false;
			}else if($scope.credentials.password == ""){
				$scope.error = "Password Invalid";
				return false;
			}
			LoginServices.login($scope.credentials).then(function (user) {
			  	
			}, function () {
				$scope.error = "Invalid login";
			});
		};
	}

	angular.module('myApp.directives', [])
	.directive('loginForm', loginDirective)
	.controller('LoginController', loginController);

})();