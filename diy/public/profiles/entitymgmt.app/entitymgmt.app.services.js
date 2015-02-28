(function() {
	
	'use strict';

    angular.module('angularApp')
        .factory('entitymgmtService', ['$rootScope','app', 
                         entitymgmtService]);
    
    function entitymgmtService($rootScope, app) {
    	
        return {
        	saveEntity : saveEntity,
        	loadEntities : loadEntities,
        	clearCache : clearCache
        };
        
        var tasks = null;
        var deferred = null;
        
        function clearCache(){
        	tasks = null;
        	deferred = null;
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
        
   	  	function saveEntity(task){
   	  		var taskToBeSaved = prepareEntityForSaving(task);
	   	 	return app.sqlserver.saveEntity(taskToBeSaved).then(function(response){
	    		if(response.success){
       	  			task.id = response.id;
       	  			taskToBeSaved.id = task.id;
       	  			saveEntityData(task, taskToBeSaved);
	    		}else{
	    			app.alert.warning('Warning','Failure while saving task!');
	    		}
	    		return response;
	    	});
   	  	}
   	  	
   	  	function saveEntityData(task, taskToBeSaved){
  			var promises = [];
  			if(task.parent == null){
  				task.parentage = "["+task.id+"]";
  				taskToBeSaved.parentage = task.parentage;
   	  			promises.push(app.sqlserver.saveEntity(taskToBeSaved));
  				angular.forEach(saveEntityFiles(task), function(promise){
  					promises.push(promise);
  				});
  			}else{
  				angular.forEach(saveEntityFiles(task), function(promise){
  					promises.push(promise);
  				});
  			}
  			app.q.all(promises).then(function(responses){
   	  			var successfulPromises = $.grep(responses, function(response){return response.success});
  				if(successfulPromises.length == promises.length){
	    	   	 	$rootScope.$broadcast('taskmgmt.task.saved', [task]);
	    	   	 	app.alert.success("Success!","Entity "+task.id+" saved successfully!");
  				}else{
  					app.alert.warning('Warning','Failure while saving task information!');
  				}
  			})
   	  	}
   	  	
   	  	function saveEntityFiles(task){
   	  		var promises = [];
  			//save task files now...
  			angular.forEach(task.uploadedFiles, function(file){
  				if(file.id == null){
  					file.task = "/tasks/"+task.id; 
  					file.entityType = "org.taskmgmt.taskfiles";
  					file.owner = "/users/"+$rootScope.session.user.id;
  					promises.push(app.sqlserver.saveEntity(file));
  				}
  			});
  			return promises;
   	  	}
   	  	
   	  	function prepareEntityForSaving(task){
   	   	  	var taskToBeSaved = {};
   	   	  	angular.copy(task, taskToBeSaved);
   	   	  	taskToBeSaved.entityType = "org.taskmgmt.tasks";
   	   	  	
   	   	  	if(task.assignee != null){
   	   	  		taskToBeSaved.assignee = "/users/"+task.assignee.id;
   	   	  	}else{
   	   	  		taskToBeSaved.assignee = "/users/"+task.assigneeId;
   	   	  	}
   	   	  	
   	   	  	if(task.owner!=null){
   	   	  		taskToBeSaved.owner="/users/"+task.owner.id;
   	   	  	}else if(task.ownerId!=null){
   	   	  		taskToBeSaved.owner="/users/"+task.ownerId;
   	   	  	}else{
   	   	  		taskToBeSaved.owner="/users/"+$rootScope.session.user.id;
   	   	  	}
   	   	  	
   	   	  	if(taskToBeSaved.assignee == null && taskToBeSaved.owner != null){
   	   	  		taskToBeSaved.assignee == taskToBeSaved.owner;
   	   	  	}
   	   	  	
   	   	  	if(task.parent!=null){
   	   	  		taskToBeSaved.parent="/tasks/"+task.parent.id;
   	   	  		taskToBeSaved.parentage = task.parent.parentage!=null? task.parent.parentage + "  >>  " + task.parent.id : task.parent.id;
   	   	  	}
   	   	  	
   	  		taskToBeSaved.createdDate = new Date();
   	  		if(taskToBeSaved.status == null){
   	  			taskToBeSaved.status = "NEW";
   	  		}
   	  		taskToBeSaved.files = null;
   	  		return taskToBeSaved;
   	  	}

    }

})();
