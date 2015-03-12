(function() {
    'use strict';

    angular.module('angularApp')
        .factory('metaService', ['$rootScope', '$q', '$resource', metaService]);
   
    function metaService($rootScope, $q, $resource) {
    	var cache = [];
    	
        return {
        	getMeta : getMeta,
        	getRegisteredDomainTypes : getRegisteredDomainTypes
        };

    	function getMeta(metaType){
    		var deferred = $q.defer();
    		var cachedItems = $.grep(cache, function(item){return (item.metaType == metaType)});
    		if(cachedItems.length > 0){
    			deferred.resolve(cachedItems[0]);
    		}else{
	    		var metaPath =  metaType.split('.').join('/');
	    		$resource("/metadata/"+metaPath+".metadata.json").get().$promise.then(function(response){
	    			response.metaType = metaType;
	    			cache.push(response);
	            	deferred.resolve(response);
	            });
    		}
    		return deferred.promise;
    	}
    	
    	function getRegisteredDomainTypes(){
    		var deferred = $q.defer();
    		var cachedItems = $.grep(cache, function(item){return (item.metaType == 'registry')});
    		if(cachedItems.length > 0){
    			deferred.resolve(cachedItems[0]);
    		}else{
	    		$resource("/metadata/registry.json").query().$promise.then(function(response){
	    			response.metaType = 'registry';
	    			cache.push(response);
	            	deferred.resolve(response);
	            });
    		}
    		return deferred.promise;
    	}
    	
    }

})();
