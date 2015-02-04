(function() {
	
    'use strict';

    angular.module('angularApp')
        .factory('docserverService', ['$resource', '$q', '$rootScope', 'AppConfig', '$log', serverService]);
   
    
    function serverService($resource, $q, $rootScope, AppConfig, $log) {
    	$rootScope.collections = [];
    	
        return {
        	init : init, 
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
    	function getPayload(response){
    		if(response == null  || response._embedded == null){
    			return [];
    		}
    		if(response._embedded["rh:doc"]!=null){
    			return response._embedded["rh:doc"];
    		}
    		if(response._embedded["rh:coll"]!=null){
    			return response._embedded["rh:coll"];
    		}
    		return [];
    	}

        function login(username, password){
        	var deferred = $q.defer();
        	searchEntities("users","{'login':'"+username+"'}").then(function(response){
        		$log.info(response.entities.length+" users found matching login "+username);
        		if(response.success){
        			if(response.entities.length == 1 && response.entities[0].password == password){
        				deferred.resolve({
                    		user : response.entities[0],
                    		success : true
                    	});        				
        			}else{
        				deferred.resolve({
                    		response : response,
                    		success : false
                    	});
        			}
        		}else{
        			deferred.resolve({
                		response : response,
                		success : false
                	});
        		}
        	});
        	return deferred.promise;
        }
        
    	
        function init(){
        	$log.info("Initializing rest database ...");
        	//check database existence
        	existsDatabase().then(function(result){
        		if(!result){
        			//create-database-here...
        			createDatabase();
        		}else{
        			initCollection("users");
        		}
        	});
        };
        
        function createDatabase() {
			$log.info("Creating database ...");
            return $resource(AppConfig.DOC_SERVER_URL, {}, {'create':{method:'PUT'}}).create({}).$promise.then(function(response){
            	initCollection("users");
            	return true;
            }, function(response) {
            	return false;
            });
        };
        
        function existsDatabase() {
        	$log.info("Checking if database already exists ...");
            return $resource(AppConfig.DOC_SERVER_URL).get().$promise.then(function(response){
            	$log.info("Databasee already exists!");
            	$rootScope.collections = getPayload(response);
            	return true;
            }, function(response) {
            	$log.warn("Databasee does not exist!");
            	return false;
            });
        };
        

        function initCollection(entityType){
        	if(!existsCollection(entityType)){
        		createCollection(entity.entityType).then(function(result){
        			if(result.success){
        				$log.info("Collection registered for type "+entity.entityType);
        				addCollection({_id:entityType});
        			}else{
        				$log.warn("Failed while creating collection of type "+entity.entityType+", error %o",result);
        			}
        		});
			}
        };
        
        function addCollection(collection){
        	$rootScope.collections.push(collection);
        }
        
        function createCollection(entityType) {
        	$log.info("Creating collection ["+entityType+"] ...");
            return $resource(AppConfig.DOC_SERVER_URL+"/"+entityType, {}, {'create':{method:'PUT'}}).create({}).$promise.then(function(response){
            	$log.info("Collection ["+entityType+"] created!");
            	return {success:true};
            }, function(response) {
            	$log.warn("Collection ["+entityType+"] could not be created!");
            	return {success:false,response:response};
            });
        };

        
        function existsCollection(entityType) {
        	$log.info("Checking if collections ["+entityType+"] already exists ...");
            return $.grep($rootScope.collections, function(collection){
            	return collection._id == entityType;
            }).length > 0;
        };
        
        function saveEntity(entity){
        	if(existsCollection(entity.entityType)){
	        	return persistEntity(entity);
        	}else{
        		createCollection(entity.entityType).then(function(result){
        			if(result.success){
        				return persistEntity(entity);
        			}else{
        				return result;
        			}
        		});
        	}	
        }
        
        function persistEntity(entity){
        	var deferred = $q.defer();
        	$log.info("Persisting entity ["+entity.entityType+"] ...%o",entity);
        	var headers = (entity._etag != null)?{'If-Match':entity._etag} : {};
        	var method = (entity._etag != null)? "PUT" : "POST";
            $resource(AppConfig.DOC_SERVER_URL+"/"+entity.entityType, {}, {'store':{method:method, headers:headers}}).store(entity, function(response, headers){
            	$log.info("Entity of type ["+entity.entityType+"] created at ["+headers('Location')+"]!");
            	deferred.resolve({
            		success: true,
            		id: headers('Location').split('/').pop()
            	});
            }, function(response) {
            	$log.warn("Entity of type ["+entity.entityType+"] could not be created!");
            	deferred.reject({
            		success : false
            	});
            });   
            return deferred.promise;
        }

        function loadEntities(entityType) {
            return $resource(AppConfig.DOC_SERVER_URL + "/"+entityType).get().$promise.then(function(response){
            	var entities = getPayload(response);
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
            return $resource(AppConfig.DOC_SERVER_URL + "/"+entityType+"/"+id).get().$promise.then(function(response){
            	var entity = getPayload(response);
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
        
        function loadNestedEntities(entity, roleType) {
            return $resource(AppConfig.DOC_SERVER_URL + "/"+entity[roleType]).get().$promise.then(function(response){
            	var entities = getPayload(response);
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
        
        function searchEntities(entityType, criteria) {
            return $resource(AppConfig.DOC_SERVER_URL + "/"+entityType+"?filter=:filter", {filter : criteria}).get().$promise.then(function(response){
            	var entities = getPayload(response);
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
