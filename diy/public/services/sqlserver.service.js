(function() {
	
    'use strict';

    angular.module('angularApp')
        .factory('sqlserverService', ['$resource', '$q', '$rootScope', 'AppConfig', '$log', serverService]);
   
    
    function serverService($resource, $q, $rootScope, AppConfig, $log) {
    	$rootScope.collections = [];
    	
        return {
        	init : init, //creates database and basic collections for first-time usage (only if they dont exist already)
        	login : login,
        	saveEntity : saveEntity,
        	loadEntity : loadEntity,
        	loadEntities : loadEntities,
        	loadNestedEntities : loadNestedEntities,
        	searchEntities : searchEntities
        };
        
    	//This will help us change one-line in single-place when we
    	//decide to switch to some different REST server which sticks
    	//payload in some other location.
    	function getPayload(response, entityType){
    		if(response == null  || response._embedded == null){
    			return [];
    		}
    		if(response._embedded[entityType]!=null){
    			return response._embedded[entityType];
    		}
    		return [];
    	}

        function login(username, password){
        	return searchEntities("org.users","findByLogin?login="+username).then(function(response){
        		$log.info(response.entities.length+" users found matching login "+username);
        		if(response.success){
        			if(response.entities.length == 1 && response.entities[0].password == password){
        				var user = response.entities[0];
        				return loadNestedEntities(user, "roles","roles").then(function(response){
        					if(response.success){
        						user.roles = response.entities;
                				return {
                            		user : user,
                            		success : true
                            	};        				
        					}else{
                				return {
                            		response : response,
                            		success : false
                            	};
        					}
        				});
        			}else{
        				return {
                    		response : response,
                    		success : false
                    	};
        			}
        		}else{
        			return {
                		response : response,
                		success : false
                	};
        		}
        	});
        }
        
        function init(){
        	$log.info("Initializing rest database ...");
        };
        
        function saveEntity(entity){
        	return persistEntity(entity);
        }
        
        function persistEntity(entity){
        	var deferred = $q.defer();
        	$log.info("Persisting entity ["+entity.entityType+"] ...%o",entity);
        	var headers = (entity._etag != null)?{'If-Match':entity._etag} : {};
        	var method = (entity.id != null)? "POST" : "POST";
        	var id = "";
        	if(entity.id != null && entity.deleted){
        		method = "DELETE";
        		id = "/"+entity.id;
        	}
        	
            $resource(AppConfig.SQL_SERVER_URL+"/"+entity.entityType+id, {}, {'store':{method:method, headers:headers}}).store(entity, function(response, headers){
            	$log.info("Entity of type ["+entity.entityType+"] created at ["+headers('Location')+"]!");
            	deferred.resolve({
            		success: true,
            		response: response,
            		id: entity.deleted ? entity.id : headers('Location').split('/').pop()
            	});
            }, function(response) {
            	$log.warn("Entity of type ["+entity.entityType+"] could not be persisted with http-"+method+"!");
            	deferred.resolve({
            		success : false,
            		response: response
            	});
            });   
            return deferred.promise;
        }

        function loadEntities(entityType) {
            return $resource(AppConfig.SQL_SERVER_URL + "/"+entityType).get().$promise.then(function(response){
            	var entities = getPayload(response, entityType);
            	return {
            		response : response,
            		entities : entities,
            		success : true
            	};
            }, function(response) {
            	return {
            		response : response,
            		entities : [],
            		success : false
            	}
            });
        };

        function loadNestedEntities(entity, roleType, entityType) {
            return $resource(AppConfig.SQL_SERVER_URL + "/"+entity.entityType+"/"+entity.id+"/"+roleType).get().$promise.then(function(response){
            	var entities = getPayload(response, entityType);
            	return {
            		response : response,
            		entities : entities,
            		success : true
            	};
            }, function(response) {
            	return {
            		response : response,
            		entities : [],
            		success : false
            	}
            });
        };
        
        function loadEntity(entityType, id) {
            return $resource(AppConfig.SQL_SERVER_URL + "/"+entityType+"/"+id).get().$promise.then(function(response){
            	var entity = response; //getPayload(response, entityType);
            	return {
            		response : response,
            		entity : entity,
            		success : true
            	};
            }, function(response) {
            	return {
            		response : response,
            		success : false
            	}
            });
        };
        
        function searchEntities(entityType, criteria) {
            return $resource(AppConfig.SQL_SERVER_URL + "/"+entityType+"/search/"+criteria, {}).get().$promise.then(function(response){
            	var entities = getPayload(response, entityType);
            	return {
            		response : response,
            		entities : entities,
            		success : true
            	};
            }, function(response) {
            	return {
            		response : response,
            		entities : [],
            		success : false
            	}
            }
            );
        };
        
    }

})();
