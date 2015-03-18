(function () {
    'use strict';

    angular.module('angularApp')
        .controller('LoginController', ['$rootScope', '$scope', '$http', '$location', '$log', 'app', loginController]);

    function loginController($rootScope, $scope, $http, $location, $log, app) {

        //dummy data so we dont have to fill every time...
        $scope.username = "admin";
        $scope.password = "password";
        
        $scope.login = function(){
        	app.authserver.login($scope.username, $scope.password).then(function(response){
        		if(response.success){
        			app.session.store("user",response.user);
        			$location.path("/welcome");
        		}else{
        			app.alert.warning("Warning", 'Authentication Failure');
        			$location.path("/login");
        		}
        	});
        }
        
        $scope.register = function(){
        	$location.path("/register");
        }
        
        function init() {
        }

        init();
    };
    
})();