(function () {
    'use strict';

    angular.module('angularApp')
        .controller('HeaderController', ['$rootScope', '$scope', '$http', '$location', '$log', 'app', headerController]);

    function headerController($rootScope, $scope, $http, $location, $log, app) {

        $log.info("header controller initialized ...");
        
        $scope.logout = function(){
        	app.session.clear();
        	app.session.init();
        	$location.path("/login");
        }
        
        function init() {
        	//initialization code goes here...
        }

        init();
    };
    
})();