(function () {
    'use strict';

    angular.module('angularApp')
        .controller('helloController', ['$rootScope', '$scope', '$http', '$location', '$log', 'app', helloController]);

    function helloController($rootScope, $scope, $http, $location, $log, app) {

        $scope.greeting = "Hello World";
        
        $scope.greetMe = function(){
        	$location.path("/welcome/hello/greetme");
        }        

        $scope.whoAmI = function(){
        	$location.path("/welcome/hello/whoami");
        }        

        $scope.myAccess = function(){
        	$location.path("/welcome/hello/myaccess");
        }        

        function init() {
        	//initialization code goes here...
        }

        init();
    };
    
})();