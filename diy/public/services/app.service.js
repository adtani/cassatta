(function() {
	'use strict';

    angular.module('angularApp')
        .factory('app', [
                         '$compile',
                         '$resource', 
                         '$rootScope', 
                         '$http',
                         '$interval',
                         '$timeout',
                         'AppConfig', 
                         'dialogs',
                         'storage', 
                         'sessionService', 
                         'alertService',
                         'restheartService',
                         'sqlserverService',
                         'metaService',
                         'responsiveService',
                         'entitiesService',
                         'pluginsService',
                         '$location',
                         '$log',
                         '$q',
                         'uiGridConstants',
                         appService]);
    
    function appService($compile,
    		$resource, 
    		$rootScope, 
    		$http,
    		$interval,
    		$timeout,
    		AppConfig, 
    		dialogs,
    		storage, 
    		sessionService,
    		alertService,
    		restheartService, 
    		sqlserverService, 
    		metaService,
    		responsiveService,
    		entitiesService,
    		pluginsService,
    		$location,
    		$log,
    		$q,
    		uiGridConstants
    		) {
    	
    	
    	/**
         * @description
         * sets current intent of communicating with the back-end, shows up on spinner
         */
        var setIntent = function(intent) {
            $rootScope.intent = intent;
        }

        /**
         * @description
         * resets intent to 'Loading...', the default spinner value
         */
        var resetIntent = function () {
            $rootScope.intent = "Loading...";
        }
    	
        return {
        	compile:$compile,
        	root:$rootScope,
        	http : $http,
        	interval : $interval,
        	timeout : $timeout,
        	session : sessionService,
        	dialogs : dialogs,
        	alert : alertService,
        	restheart : restheartService,
        	sqlserver : sqlserverService,
        	authserver : sqlserverService,
        	meta : metaService,
        	responsive : responsiveService,
        	entities:entitiesService,
        	plugins: pluginsService,
        	config : AppConfig,
        	location : $location,
        	log : $log,
        	q : $q,
        	grid : uiGridConstants,
        	setIntent : setIntent,
        	resetIntent : resetIntent
        };

    }

})();
