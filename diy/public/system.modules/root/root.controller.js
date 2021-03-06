(function () {
    'use strict';

    angular.module('angularApp')
        .controller('RootController', ['$rootScope', '$scope', '$http', '$location', '$log', 'app', rootController]);

    function rootController($rootScope, $scope, $http, $location, $log, app) {

    	$rootScope.intent = "Loading...";
        
        function init() {
        	
        	//first things first, retrieve session state into root scope
        	app.session.init();
//        	app.restheart.init();

        	$rootScope.app = app;

        	if($rootScope.session.user == null){
        		$location.path("/login");
        	}

        	//Load async dependencies via require.js
        	require(["bower_components/moment/moment"], function(meta) {});
        }

        init();
    };
    
})();