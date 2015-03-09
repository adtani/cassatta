(function() {
	
	'use strict';

    angular.module('angularApp')
        .factory('entitymgmtService', ['$rootScope','app', 
                         entitymgmtService]);
    
    function entitymgmtService($rootScope, app) {
    	
        return {
        	saveEntity : saveEntity,
        	loadEntities : loadEntities,
        	clearCache : clearCache,
        	loadReferences : loadReferences
        };
        
        var tasks = null;
        var deferred = null;
        
        function clearCache(){
        	tasks = null;
        	deferred = null;
        }
        
        function loadReferences(entity, meta){
        	var allfields = getAllFields(meta);
   	  		angular.forEach(allfields, function(field){
   	  			if((field.type == 'OTO' || field.type == 'owner') && entity[field.name+"Id"] != null){
   	  				var entityId = entity[field.name+"Id"];
	   	  			app.sqlserver.loadEntity(field.entityType, entityId).then(function(response){
	   	    			if(response.success){
	   	    				entity[field.name] = response.entity;
	   	    				//set display on it, since it may not be already set by the server..
	   	    				app.meta.getMeta(response.entity.entityType).then(function(entityMeta){
				    			var searchableFields = $.grep(entityMeta.editor.tabs[0].fields, function(field){
		   		   	  				return field.searchable == true;
		   		   	  			});
				    			response.entity.display = "["+response.entity.id+"]: "+ response.entity[searchableFields[0].name];
	   	    				});
	   	    			}
	   	    		});
   	  			}
	   	  		if(field.type == 'OTM'){
   	  				var subEntitiesURL = entity[field.name];
	   	  			app.sqlserver.loadNestedEntities(entity, field.name, field.entityType).then(function(response){
	   	    			if(response.success){
	   	    				entity[field.name] = response.entities;
	   	    				//set display on it, since it may not be already set by the server..
	   	    				app.meta.getMeta(field.entityType).then(function(entityMeta){
				    			var searchableFields = $.grep(entityMeta.editor.tabs[0].fields, function(field){
		   		   	  				return field.searchable == true;
		   		   	  			});
				    			response.entity.display = "["+response.entity.id+"]: "+ response.entity[searchableFields[0].name];
	   	    				});
	   	    			}
	   	    		});
   	  			}
   	  		});
        }

        function loadEntities(entityType, urlFilter){
        	if(deferred == null){
	        	deferred = app.q.defer();
	        	if(tasks == null){
	        		var filter = urlFilter.split(":SESSION_USER_ID").join($rootScope.session.user.id);
	        		var promise = null;
	        		if(filter!=null && filter.length > 0){
	        			promise = app.sqlserver.searchEntities(entityType,filter);
	        		}else{
	        			promise = app.sqlserver.loadEntities(entityType);
	        		}
		       	  	promise.then(function(response){
		       	  		if(response.success){
		       	  			tasks = response.entities;
		    	   	  		for(var i = 0; i < tasks.length; i++){
		    	  	   	      tasks[i].dueDate = new Date(tasks[i].dueDate);
		    	  	   	    }
		    	   	  		deferred.resolve(tasks);
		    	  	   	    $rootScope.$broadcast('taskmgmt.tasksupdated', tasks);
		       	  		}else{
		       	  			deferred.reject(response);
		       	  		}
		       	  	});
	        	}else{
	        		defered.resolve(tasks);
	        	}
        	}
        	return deferred.promise;
        }

   	  	function saveEntity(entity, domainType){
   	  		var deferred = app.q.defer();
	   	  	app.meta.getMeta(domainType).then(function(entityMeta){
	   	  		saveEntityBasedOnMeta(entity, entityMeta, deferred);
	   	  	});
	   	  	return deferred.promise;
   	  	}
   	  	
   	  	function getAllFields(entityMeta){
   	  		var allfields = [];
	   	  	if(entityMeta.editor.tabs!=null){
	   	  		angular.forEach(entityMeta.editor.tabs, function(tab){
			  		angular.forEach(tab.fields, function(field){
			  			allfields.push(field);
			  		});
			  	});
	   	  	}
	   	  	if(entityMeta.editor.fields!=null){
		   	  	angular.forEach(entityMeta.editor.fields, function(field){
		   	  		allfields.push(field);
		  		});
	   	  	}   
	   	  	return allfields;
   	  	}
   	  	
   	  	function saveEntityBasedOnMeta(entity, entityMeta, deferred){
	   	  	var entityToBeSaved = {};
	   	  	var allfields = [];
	   	  	populateFieldsBasedOnMeta(entityToBeSaved, entity, entityMeta, allfields);

	   	  	return app.sqlserver.saveEntity(entityToBeSaved).then(function(response){
    			response.entity = entityToBeSaved;
	    		if(response.success){
	    			entityToBeSaved.id = response.id;
	    			entity.id = response.id;
	    	   	 	
	    			var promises = [];
	    			//save nested entities with this id now...
	    			angular.forEach(allfields, function(field){
		   	  			if(field.type == 'OTM'){
		   	  				if(entity[field.name]!=null){
			   	  				angular.forEach(entity[field.name], function(subEntity){
			   	  					subEntity[field.reverseReference] = {id: entity.id};
			   	  					promises.push(saveEntityBasedOnMeta(subEntity, field.meta, null));
			   	  				});
		   	  				}
		   	  			}
		   	  		});
	    			
	    			if(promises.length > 0){
		    			app.q.all(promises).then(function(responses){
		    				var failures = $.grep(responses, function(response){return !response.success;});
		    				if(failures.length == 0){
				    	   	 	if(deferred!=null){
			    	    			app.alert.success("Success!","Entity "+response.id+" of type "+entityToBeSaved.entityType+" saved successfully!");
			    					$rootScope.$broadcast('entitymgmt.entity.saved', [entity]);
				    				deferred.resolve(response);
				    			}
		    				}else{
		    					app.alert.error("Failure!",failures.length+" nested entities out of "+responses.length+" could not be saved!");
		    					if(deferred!=null){
				    				deferred.reject(response);
				    			}		    					
		    				}
		    			});
	    			}else{
	    				if(deferred!=null){
	    	    			app.alert.success("Success!","Entity "+response.id+" of type "+entityToBeSaved.entityType+" saved successfully!");
	    					$rootScope.$broadcast('entitymgmt.entity.saved', [entity]);
	    					deferred.resolve(response);
	    				}
	    			}
	    		}else{
	    			console.error("failure response while saving entity %o", response);
	    			app.alert.warning('Warning','Failure while saving entity of type '+entityToBeSaved.entityType+'!');
	    			deferred.reject(response);
	    		}
	    		return response;
	    	});   	  		
   	  	}

   	  	function populateFieldsBasedOnMeta(entityToBeSaved, entity, entityMeta, allfields){
	   	  	if(entityMeta.editor.tabs!=null){
	   	  		angular.forEach(entityMeta.editor.tabs, function(tab){
			  		angular.forEach(tab.fields, function(field){
			  			allfields.push(field);
			  			populateField(entityToBeSaved, entity, field, entityMeta);
			  		});
			  	});
	   	  	}
	   	  	if(entityMeta.editor.fields!=null){
		   	  	angular.forEach(entityMeta.editor.fields, function(field){
		   	  		allfields.push(field);
		  			populateField(entityToBeSaved, entity, field, entityMeta);
		  		});
	   	  	}   
	   	  	populateImplicitFields(entityToBeSaved, entity, entityMeta);
   	  	}
   	  	
   	  	function populateField(entityToBeSaved, entity, field, entityMeta){
  			if(field.type != 'OTM'){
  				entityToBeSaved[field.name] = entity[field.name];
  			}
   	  		if(field.type == 'file' && entity[field.name]!=null){
  				entityToBeSaved[field.name] = entity[field.name].filename!=null? entity[field.name].filename+":"+entity[field.name].filepath : entity[field.name];
  			}
  			if(field.type == 'OTO' && entity[field.name]!=null){
  				entityToBeSaved[field.name] = "/"+field.entityType+"/"+entity[field.name].id;
  			}
   	  	}
   	  	
   	  	function populateImplicitFields(entityToBeSaved, entity, entityMeta){
			entityToBeSaved['entityType'] = entityMeta.editor.entityType;
			entityToBeSaved['owner'] = "/org.users/"+$rootScope.session.user.id;
			entityToBeSaved['deleted'] = entity['deleted'];
			entityToBeSaved['updatedOn'] = new Date();
			if(entityToBeSaved.id==null){
				entityToBeSaved['createOn'] = new Date();
			}
   	  	}

    }

})();