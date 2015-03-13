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

    	function getMeta(domainType){
    		var deferred = $q.defer();
    		var cachedItems = $.grep(cache, function(item){return (item.domainType == domainType)});
    		if(cachedItems.length > 0){
    			deferred.resolve(cachedItems[0]);
    		}else{
	    		var metaPath =  domainType.split('.').join('/');
	    		$resource("/metadata/"+metaPath+".metadata.json").get().$promise.then(function(response){
	    			response.domainType = domainType;
	    			cache.push(response);
	            	deferred.resolve(response);
	            });
    		}
    		return deferred.promise;
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
