(function() {
	
	'use strict';

    angular.module('angularApp')
        .factory('taskmgmtService', ['$rootScope','app', 
                         taskmgmtService]);
    
    function taskmgmtService($rootScope, app) {
    	
        return {
        	saveTask : saveTask,
        	loadTasks : loadTasks,
        	clearCache : clearCache
        };
        
        var tasks = null;
        var deferred = null;
        
        function clearCache(){
        	tasks = null;
        	deferred = null;
        }

        function loadTasks(){
        	if(deferred == null){
	        	deferred = app.q.defer();
	        	if(tasks == null){
		       	  	app.sqlserver.searchEntities("org.taskmgmt.tasksview","findByAssigneeIdAndStatusNot?assigneeId="+$rootScope.session.user.id+"&status=DONE").then(function(response){
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
        
   	  	function saveTask(task){
   	  		var taskToBeSaved = prepareTaskForSaving(task);
	   	 	return app.sqlserver.saveEntity(taskToBeSaved).then(function(response){
	    		if(response.success){
       	  			task.id = response.id;
       	  			taskToBeSaved.id = task.id;
       	  			saveTaskData(task, taskToBeSaved);
	    		}else{
	    			app.alert.warning('Warning','Failure while saving task!');
	    		}
	    		return response;
	    	});
   	  	}
   	  	
   	  	function saveTaskData(task, taskToBeSaved){
  			var promises = [];
  			if(task.parent == null){
  				task.parentage = "["+task.id+"]";
  				taskToBeSaved.parentage = task.parentage;
   	  			promises.push(app.sqlserver.saveEntity(taskToBeSaved));
  				angular.forEach(saveTaskFiles(task), function(promise){
  					promises.push(promise);
  				});
  			}else{
  				angular.forEach(saveTaskFiles(task), function(promise){
  					promises.push(promise);
  				});
  			}
  			app.q.all(promises).then(function(responses){
   	  			var successfulPromises = $.grep(responses, function(response){return response.success});
  				if(successfulPromises.length == promises.length){
	    	   	 	$rootScope.$broadcast('taskmgmt.task.saved', [task]);
	    	   	 	app.alert.success("Success!","Task "+task.id+" saved successfully!");
  				}else{
  					app.alert.warning('Warning','Failure while saving task information!');
  				}
  			})
   	  	}
   	  	
   	  	function saveTaskFiles(task){
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
   	  	
   	  	function prepareTaskForSaving(task){
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
   	  		
   	  		//implicit fields ...
			taskToBeSaved['updateTimestamp'] = moment().format('YYYY-MM-DD');
			taskToBeSaved['createTimestamp'] = moment().format('YYYY-MM-DD');
   	  		
   	  		taskToBeSaved.files = null;
   	  		return taskToBeSaved;
   	  	}

    }

})();
