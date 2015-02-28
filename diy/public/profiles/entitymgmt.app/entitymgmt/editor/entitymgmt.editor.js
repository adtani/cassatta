(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('entityEditorController',
			[ '$rootScope', '$scope', '$routeParams', 'app', 'entitymgmtService', entityEditorController ]);
	
	function entityEditorController($rootScope, $scope, $routeParams, app, entitymgmtService) {

		app.log.info("AddEntity controller initialized ...");

		$scope.title = "Entity Editor";
		$scope.users = [];
		$scope.paneltype = "panel-primary";

		$scope.priority = 0;
   	  	$scope.priorities = [0,1,2,3,4,5];		
   	  	
   	  	$scope.entity = null;
   	  	
   	  	//TODO:Generic search capability for relations...
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
   	  	
   	  	//TODO:Logic when entity is selected for editing...
   	  	$scope.$on('entitymgmt.entity.selected', function(event, entities){
	   	  		$scope.entity = entities[entities.length-1];
	   	  		$scope.title = "Entity Editor - "+$scope.entity.entityType+"["+$scope.entity.id+"]";
//	   	    	if($scope.entity.id != null && $scope.entity.assignee == null){
//	   	    		app.sqlserver.loadEntity("org.users",$scope.entity.assigneeId).then(function(response){
//	   	    			if(response.success){
//	   	    				$scope.entity.assignee = response.entity;
//	   	    			}
//	   	    		});
//	   	    	}
//	   	    	if($scope.entity.id != null && $scope.entity.files == null){
//	   	    		app.sqlserver.loadNestedEntities($scope.task,"files","org.taskmgmt.taskfiles").then(function(response){
//	   	    			if(response.success){
//	   	    				$scope.uploadedFiles = response.entities;
//	   	    			}
//	   	    		});
//	   	    	}
	   	  		setPanelType();
   	  	});

//   	  	TODO:Fix this ...
//   	  	entitymgmtService.loadEntities().then(function(tasks){
//  	   	    $scope.tasks = tasks;
//   	  	});

   	  	
//   	  	$scope.$on('taskmgmt.newtask', function(event, task){
//   	  		$scope.task = task;
//   	  		$scope.title = "Entity Editor - New Entity";
//   	  		setPanelType();
//   	  	});

   	  	$scope.resetEntity = function(){
   	  		$scope.initEntity();
   	  	}
   	  	
   	  	function setPanelType(){
   	  		$scope.paneltype = $scope.entity != null? ($scope.entity.id != null ? "panel-primary" : "panel-success") : "panel-info";
   	  	}
   	  	
   	  	$scope.saveEntity = function(){
   	  		entitymgmtService.saveEntity($scope.task).then(function(){
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
		$scope.uploadedFiles = [];
   	  	
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
				$scope.uploadedFiles.push(response.data);
				}, 5000);
			app.log.info("File uploaded successfully! %o", response);
		}
		
		$scope.onUploadComplete = function(response){
			app.log.info("File upload completed! %o", response);
		}
   	  	//END-UPLOAD-MANAGEMENT

		
		$scope.selectEntity = function(entity){
			$scope.domainType = entity;
	   	  	app.meta.getMeta($scope.domainType.entityType).then(function(meta){
	    		$scope.meta = meta;
	    	}, function(response){
	    		console.warn(response);
	    	});   	  		
		}

		function initEntityType(){
			if($routeParams.action != null){
				$scope.selectEntity($.grep($scope.entityTypes, function(entity){
					return entity.entityType == $routeParams.action;
				})[0]);
			}else{
				app.location.path("/welcome/entitymgmt/"+$scope.entityTypes[0].entityType);
			}
		}
		
		function init() {
			// initialization code goes here...
			setPanelType();
			initEntityType();
		}

		init();

	}

})();