(function () {
    'use strict';

    angular.module('angularApp')
        .controller('MyController', ['$rootScope', '$scope', '$http', '$location', '$log', myController]);

    function myController($rootScope, $scope, $http, $location, $log) {

        $log.info("my controller initialized ...");
        
        function init() {
        	//initialization code goes here...
        }

        init();
    };
    
})();