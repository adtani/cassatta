(function() {
    'use strict';

    angular.module('angularApp')
        .factory('sessionService', ['$resource', '$rootScope', 'AppConfig', 'storage', sessionService]);
   
    
    function sessionService($resource, $rootScope, AppConfig, storage) {
    	
        return {
        	store : store,
        	init : init,
        	get: get,
        	clear : clear,
        	alert : alert
        };

    	function store(key, value){
    		$rootScope.session[key] = value;
    		storage.set('session',$rootScope.session);
    	}

    	function get(key){
    		return $rootScope[key];
    	}
    	
    	function init(){
    		if(storage.get('session') == null){
    			storage.set('session',{});
    		}
    		$rootScope.session = storage.get('session');
    		//other load-time initialization...
    		$rootScope.alerts = [];
    	}
    	
    	function clear(){
    		$rootScope.session = null;
    		storage.clearAll();
    	}
    	
    	function alert(type, message){
    		$rootScope.alerts.push({type:type, message:message}); 
    	}

    }

})();
