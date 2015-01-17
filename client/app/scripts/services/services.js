'use strict';

(function (){

	/**
	 * Login Services 
	 */
	function loginServices($http, $rootScope){
		var loginServices = {};
		/** Login method **/
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

	/*
	* Session Expired Services handling calls from the interceptor
	*/
	function sessionExpiredService($rootScope, $q){
		return {
			responseError: function(response){
				//Further cases should be treated here
				$rootScope.$broadcast('user:logout', response);
				return $q.reject(response);
			}
		}
	}

	/*
	 *Configuration of the Session Interceptor
	 */
	function sessionInterceptor($httpProvider) {
		$httpProvider.interceptors.push([
			'$injector',
			function ($injector) {
				return $injector.get('SessionExpiredService');
			}
		]);
	}

	/**
	 * Session Services to be implemented to store information about the sesion and the user
	 */
	function sessionServices($rootScope){
		var sessionServices = {}

		$rootScope.$on('user:login', function(data){
			sessionInterceptor.session = true;
		});

		sessionServices.destroy = function(){
			sessionInterceptor.session = false;
			$rootScope.$broadcast('user:logout');
		};

		return sessionServices;
	}

	/** Angular configuration **/
	angular.module('myApp.services', [])
	.factory('LoginServices', loginServices)
	.factory('SessionExpiredService', sessionExpiredService)
	.config(sessionInterceptor)
	.factory('SessionServices', sessionServices);
})();