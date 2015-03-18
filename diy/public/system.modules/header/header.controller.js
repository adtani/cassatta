(function () {
    'use strict';

    angular.module('angularApp')
        .controller('HeaderController', ['$rootScope', '$scope', '$http', '$location', '$log', 'app', headerController]);

    function headerController($rootScope, $scope, $http, $location, $log, app) {
        
        $scope.logout = function(){
        	app.authserver.logout().then(function(response){
        		if(response.success){
                	app.session.clear();
                	app.session.init();
                	$location.path("/login");
        		}else{
        			app.alert.warning("Warning", 'Could not be logged out, sorry!');
        		}
        	});
        }
        
        function init() {
        	//initialization code goes here...
        }

        init();
    };
    
})();