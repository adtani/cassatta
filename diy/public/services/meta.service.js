(function() {
    'use strict';

    angular.module('angularApp')
        .factory('metaService', ['$rootScope', '$q', '$resource', metaService]);
   
    function metaService($rootScope, $q, $resource) {
    	var cache = [];
    	
        return {
        	getMeta : getMeta,
        	getRegisteredDomainType: getRegisteredDomainType,
        	getRegisteredDomainTypes : getRegisteredDomainTypes
        };

    	function getMeta(domainType){
    		var deferred = $q.defer();
    		var cachedItems = $.grep(cache, function(item){return (item.domainType == domainType)});
    		if(cachedItems.length > 0){
    			deferred.resolve(cachedItems[0]);
    		}else{
    			require(["metadata/"+domainType.split('.').join('/')+".config"], function(meta) {
    				if(meta!=null){
		    			meta.domainType = domainType;
		    			cache.push(meta);
		            	deferred.resolve(meta);
    				}else{
    					console.warn("Failed to load metadata for "+domainType);
    				}
    			});
    		}
    		return deferred.promise;
    	}
    	
    	function getRegisteredDomainType(domainType){
    		return getRegisteredDomainTypes().then(function(domainTypes){
    			return $.grep(domainTypes, function(registeredDomainType){
    				return registeredDomainType.domainType == domainType;
    			})[0];
    		});
    	}
    	
    	function getRegisteredDomainTypes(){
    		var deferred = $q.defer();
    		var cachedItems = $.grep(cache, function(item){return (item.domainType == 'registry')});
    		if(cachedItems.length > 0){
    			deferred.resolve(cachedItems[0]);
    		}else{
	    		$resource("/metadata/registry.json").query().$promise.then(function(response){
	    			response.domainType = 'registry';
	    			cache.push(response);
	            	deferred.resolve(response);
	            });
    		}
    		return deferred.promise;
    	}
    	
    }

})();
