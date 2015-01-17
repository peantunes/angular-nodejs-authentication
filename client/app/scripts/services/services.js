'use strict';

(function (){

	function loginServices($http, $rootScope){
		var loginServices = {};
		loginServices.login = function(credentials){
			return $http
				.post('/login', credentials)
				.then(function (res) {
					$rootScope.$broadcast('user:login');
					// return res.data.session;
				});
		};

		return loginServices;
	}

	function sessionServices($rootScope){

		$rootScope.$on('user:login', function(data){

		});

		//implement here the broadcast for session expire
		
	}

	function sessionInterceptor($httpProvider) {
		$httpProvider.interceptors.push([
			'$injector',
			function ($injector) {
				return $injector.get('SessionExpiredService');
			}
		]);
	}

	function sessionExpiredService($rootScope, $q){
		return {
			responseError: function(response){
				//Further cases should be treated here
				$rootScope.$broadcast('user:logout', response);
				return $q.reject(response);
			}
		}
	}

	angular.module('myApp.services', [])
	.factory('LoginServices', loginServices)
	.factory('SessionExpiredService', sessionExpiredService)
	.config(sessionInterceptor)
	.factory('SessionServices', sessionServices);
})();