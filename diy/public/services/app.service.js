(function() {
	'use strict';

    angular.module('angularApp')
        .factory('app', ['$resource', 
                         '$rootScope', 
                         '$http',
                         '$interval',
                         '$timeout',
                         'AppConfig', 
                         'dialogs',
                         'storage', 
                         'sessionService', 
                         'alertService',
                         'docserverService',
                         'sqlserverService',
                         '$location',
                         '$log',
                         '$q',
                         'uiGridConstants',
                         appService]);
    
    function appService($resource, 
    		$rootScope, 
    		$http,
    		$interval,
    		$timeout,
    		AppConfig, 
    		dialogs,
    		storage, 
    		sessionService,
    		alertService,
    		docserverService, 
    		sqlserverService, 
    		$location,
    		$log,
    		$q,
    		uiGridConstants
    		) {
    	
        return {
        	http : $http,
        	interval : $interval,
        	timeout : $timeout,
        	session : sessionService,
        	dialogs : dialogs,
        	alert : alertService,
        	docserver : docserverService,
        	sqlserver : sqlserverService,
        	authserver : sqlserverService,
        	config : AppConfig,
        	location : $location,
        	log : $log,
        	q : $q,
        	grid : uiGridConstants
        };

    }

})();
