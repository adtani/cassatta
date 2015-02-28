(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('taskmgmtAddTaskController',
			[ '$rootScope', '$scope', 'app', 'taskmgmtService', taskmgmtAddTaskController ]);
	
	function taskmgmtAddTaskController($rootScope, $scope, app, taskmgmtService) {

		app.log.info("AddTask controller initialized ...");

		$scope.title = "Task Editor : New Task";
		$scope.users = [];
		$scope.paneltype = "panel-primary";

		$scope.priority = 0;
   	  	$scope.priorities = [0,1,2,3,4,5];		
   	  	$scope.task = {
   	   	  			parent:null,
   	   	  			parentage:null,
   	   	  			title:"New Task Title ...",
   	   	  			summary:"New Task Summary ...",
   	    	  		priority:0,
   	    	  		dueDate: new Date(),
   	    	  		assignee: $rootScope.session.user,
   	    	  		owner: $rootScope.session.user,
   	    	  		createdDate: new Date(),
   	    	  		uploadedFiles: []
   	 	};
   	  	
   	  	$scope.searchUsers = function(pattern){
   	  		if(pattern.length > 2){
		   	 	app.sqlserver.loadEntities("org.users").then(function(response){
		    		if(response.success){
		    			$scope.users = $.grep(response.entities, function(user){
		    				return user.login.indexOf(pattern) >= 0;
		    			});
		    		}else{
		    			app.alert.warning('Warning','Search Failure');
						app.location.path("/login");
		    		}
		    	});   	  		
   	  		}
   	  	};
   	  	
   	  	$scope.$on('taskmgmt.tasks.selected', function(event, tasks){
   	  		$scope.task = tasks[tasks.length-1];
   	  		$scope.title = "Task Editor - Task "+$scope.task.id;
   	    	if($scope.task.id != null && $scope.task.assignee == null){
   	    		app.sqlserver.loadEntity("org.users",$scope.task.assigneeId).then(function(response){
   	    			if(response.success){
   	    				$scope.task.assignee = response.entity;
   	    			}
   	    		});
   	    	}
   	    	if($scope.task.id != null && $scope.task.files == null){
   	    		app.sqlserver.loadNestedEntities($scope.task,"files","org.taskmgmt.taskfiles").then(function(response){
   	    			if(response.success){
   	    				$scope.task.uploadedFiles = response.entities;
   	    			}
   	    		});
   	    	}
   	  		setPanelType();
   	  	});

   	  	taskmgmtService.loadTasks().then(function(tasks){
  	   	    $scope.tasks = tasks;
   	  	});

   	  	$scope.$on('taskmgmt.newtask', function(event, task){
   	  		$scope.task = task;
   	  		$scope.title = "Task Editor - New Task";
   	  		setPanelType();
   	  	});

   	  	$scope.resetTask = function(){
   	  		$scope.initTask();
   	  	}
   	  	
   	  	function setPanelType(){
   	  		$scope.paneltype = $scope.task.id != null ? "panel-primary" : "panel-success";
   	  	}
   	  	
   	  	$scope.saveTask = function(){
   	  		taskmgmtService.saveTask($scope.task).then(function(){
   	  			setPanelType();
   	  		});
   	  	}
   	  	
		//START-DATE-MANAGEMENT
		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
		};

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear : 'yy',
			startingDay : 1
		};

		$scope.formats = [ 'yyyy-MM-dd', 'yyyy-MM-dd HH:mm:ss', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy',
				'shortDate' ];
		$scope.format = $scope.formats[0];
		//END-DATE-MANAGEMENT

		
		
   	  	//START-UPLOAD-MANAGEMENT
		$scope.progress = 0;
		$scope.max = 100;
   	  	$scope.task.uploadedFiles = [];
   	  	
		function startProgress(){
			var newvalue = Math.floor((Math.random() * 100) + 1);
			if(newvalue > $scope.progress && newvalue - $scope.progress <= 20){
				$scope.progress = newvalue;
			}
		}
		
		$scope.onUploadStart = function(files){
			$scope.progress = 0;
			$scope.animation = app.interval(startProgress,500);
			app.log.info("File uploade started! %o", files);
		}
		
		$scope.onUploadError = function(response){
			app.timeout( function(){ 
				$scope.progress = 0; 
				app.interval.cancel($scope.animation);
				}, 5000);
			app.log.info("File upload failed! %o", response);
		}
		
		$scope.onUploadSuccess = function(response){
			app.timeout( function(){ 
				$scope.progress = 100; 
				app.interval.cancel($scope.animation);
				$scope.task.uploadedFiles.push(response.data);
				}, 5000);
			app.log.info("File uploaded successfully! %o", response);
		}
		
		$scope.onUploadComplete = function(response){
			app.log.info("File upload completed! %o", response);
		}
   	  	//END-UPLOAD-MANAGEMENT

		function init() {
			// initialization code goes here...
			setPanelType();
		}

		init();

	}

})();