(function () {
	'use strict';

    angular.module('angularApp')
        .controller('WelcomeController', ['$rootScope', '$scope', '$http', '$location', '$routeParams', 'app', welcomeController]);

    function welcomeController($rootScope, $scope, $http, $location, $routeParams, app) {

    	$rootScope.modules = app.config.modules;
    	
    	$scope.launchModule = function(moduleName){
    		$location.path("/welcome/"+moduleName);
    	};
    	
    	$scope.performAction = function(actionName){
    		$location.path("/welcome/"+$scope.module.name+"/"+actionName);
    	};
    	
        function init() {
        	//initialization code goes here...
        	if($routeParams.module != null && $routeParams.module.length > 0){
        		var modules = $.grep($rootScope.modules, function(module){
        			return module.name == $routeParams.module
        			      && module.level >= $rootScope.session.user.access;
        		});
        		
        		if(modules!=null && modules.length > 0){
	        		
        			$rootScope.module = modules[0];
        			
        			$rootScope.otherModules = $.grep($rootScope.modules, function(module){
        				return module.name != $rootScope.module.name;
        			});
        			
        			var htmlpath="/"+$rootScope.module.path+"/"+$rootScope.module.name+"/"+$rootScope.module.name+".html";
	        		
	        		if($routeParams.action != null && $routeParams.action.length > 0){
	        			var actions = $.grep($rootScope.module.actions, function(action){
	            			return action.name == $routeParams.action;
	            		});
	        			if(actions!=null && actions.length > 0){
	        				var actions = $.grep($rootScope.module.actions, function(action){
		            			return action.name == $routeParams.action
		            			     && action.level >= $rootScope.session.user.access;
		            		});	        				
	        				if(actions!=null && actions.length > 0){
	        					htmlpath="/"+$rootScope.module.path+"/"+$rootScope.module.name+"/"+$routeParams.action+"/"+$rootScope.module.name+"."+$routeParams.action+".html";
	        				}else{
		            			app.alert.warning("Warning", "You are not authorized to perform this action!");
		            		}
	            		}else{
	            			//dynamic action that was not even defined, let the module handle it.
	            			//htmlpath="/"+$rootScope.module.path+"/"+$rootScope.module.name+"/"+$routeParams.action+"/"+$rootScope.module.name+"."+$routeParams.action+".html";
	            		}
	        		}
	        		
	        		$scope.htmlpath = htmlpath;
	        		
        		}else{
        			app.alert.warning("Warning", "You are not authorized to launch this module!");
        			$location.path("/welcome");
        		}
        	}
        }

        init();
    };
    
})();