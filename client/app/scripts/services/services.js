'use strict';

(function (){

	var host = "http://127.0.0.1:8001";

	/**
	 * List of authentication Services 
	 */
	function listAuthenticationService($http, $rootScope, SessionServices){
		var listAuthenticationService = {};
		/** Login method **/
		listAuthenticationService.logs = function(){
			console.log(SessionServices.token);
			return $http({
					method: 'GET', 
					url:host+'/list',
					headers:{'Authorization':SessionServices.token}
				})
				.then(function (res) {
					$rootScope.$broadcast('user:login');
					// return res.data.session;
					return res.data;
				});
		};

		return listAuthenticationService;
	}

	/**
	 * Login Services 
	 */
	function loginServices($http, SessionServices){
		var loginServices = {};
		/** Login method **/
		loginServices.login = function(credentials){
			return $http
				.post(host+'/login', credentials)
				.then(function (res) {
					SessionServices.setToken(res.data.token);
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

		sessionServices.token = null;

		sessionServices.setToken = function(token){
			sessionServices.token = token;
			$rootScope.$broadcast('user:login');	
			sessionInterceptor.session = true;
		}
		sessionServices.destroy = function(){
			sessionInterceptor.session = false;
			$rootScope.$broadcast('user:logout');
		};

		return sessionServices;
	}

	/** Angular configuration **/
	angular.module('myApp.services', [])
	.factory('ListAuthenticationService', listAuthenticationService)
	.factory('LoginServices', loginServices)
	.factory('SessionExpiredService', sessionExpiredService)
	.config(sessionInterceptor)
	.factory('SessionServices', sessionServices);
})();