(function () {
    'use strict';

    angular.module('angularApp')
        .controller('RootController', ['$rootScope', '$scope', '$http', '$location', '$log', 'app', rootController]);

    function rootController($rootScope, $scope, $http, $location, $log, app) {

        $log.info("RootController Initialized ...");
        
        function init() {
        	//first things first, retrieve session state into root scope
        	app.session.init();
        	//app.docserver.init();

        	$rootScope.app = app;
        	$rootScope.intent = "Loading...";

        	/**
             * @description
             * sets current intent of communicating with the back-end, shows up on spinner
             */
            $rootScope.setIntent = function(intent) {
                $rootScope.intent = intent;
            }

            /**
             * @description
             * resets intent to 'Loading...', the default spinner value
             */
            $rootScope.resetIntent = function () {
                $rootScope.intent = "Loading...";
            }
        	
        	if($rootScope.session.user == null){
        		$location.path("/login");
        	}
        }

        init();
    };
    
})();