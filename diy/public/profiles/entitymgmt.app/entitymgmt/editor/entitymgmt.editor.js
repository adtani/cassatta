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
   	  	
   	  	$scope.results = [{id:1,name:"result1",displaytext:"result1text"},{id:2,name:"result2",displaytext:"result2text"}]
   	  	
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
   	  	
   	  	//TODO: Optimize look-up search
   	  	$scope.searchEntities = function(fieldName, entityType, pattern){
   	  		if(pattern.length > 2){
		   	 	app.sqlserver.loadEntities(entityType).then(function(response){
		    		if(response.success){
		   		   	  	app.meta.getMeta(entityType).then(function(entityMeta){
		   		    		$scope.results[fieldName] = $.grep(response.entities, function(entity){
			   		   	  		var matchedFields = $.grep(entityMeta.editor.tabs[0].fields, function(field){
			   		   	  			return field.searchable == true && entity[field.name].indexOf(pattern) >= 0;
			   		   	  		});
			   		   	  		return matchedFields.length > 0;
			    			});		   
		   		    		angular.forEach($scope.results[fieldName], function(result){
		   		    			var searchableFields = $.grep(entityMeta.editor.tabs[0].fields, function(field){
			   		   	  			return field.searchable == true;
			   		   	  		});
		   		    			result.display = "["+result.id+"]: "+result[searchableFields[0].name];
		   		    		});
		   		    	}, function(response){
		   		    		console.warn(response);
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
	   	  		
	   	  		entitymgmtService.loadReferences($scope.entity, $scope.meta);
	   	  		setPanelType();
   	  	});

//   	  	TODO:Fix this ...
//   	  	entitymgmtService.loadEntities().then(function(tasks){
//  	   	    $scope.tasks = tasks;
//   	  	});

   	  	
   	  	$scope.$on('entitymgmt.newentity', function(event, entity){
   	  		$scope.entity = entity;
   	  		$scope.title = "Entity Editor - New Entity";
   	  		setPanelType();
   	  	});

   	  	$scope.resetEntity = function(){
   	  		$scope.initEntity();
   	  	}
   	  	
   	  	function setPanelType(){
   	  		$scope.paneltype = $scope.entity != null? ($scope.entity.id != null ? "panel-primary" : "panel-success") : "panel-info";
   	  	}

   	  	$scope.deleteEntity = function(){
			var dlg = app.dialogs.confirm('Confirm Deletion',"Are you sure?",["Yeah","May Be!","No Way!"]);
			dlg.result.then(function(btn){
				$scope.entity.deleted = true;
				entitymgmtService.saveEntity($scope.entity, $scope.meta.editor.entityType).then(function(){
	   	  			setPanelType();
	   	  		});
				app.alert.success(field.label+" Removed!");
			},function(btn){
				
			});			
		}
		

   	  	$scope.saveEntity = function(){
   	  		entitymgmtService.saveEntity($scope.entity, $scope.meta.editor.entityType).then(function(){
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
		
		$scope.minDate = new Date();

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
		
		$scope.onUploadStart = function(files,field){
			$scope.progress = 0;
			$scope.animation = app.interval(startProgress,500);
			app.log.info("File uploade started for field "+field+"! %o", files);
		}
		
		$scope.onUploadError = function(response, field){
			$scope.progress = 0; 
			app.interval.cancel($scope.animation);
			app.log.info("File upload failed for field "+field+"! %o", response);
		}
		
		$scope.onUploadSuccess = function(response, field){
			var tokens = field.split(":");
			$scope.progress = 100; 
			app.interval.cancel($scope.animation);
			if(response.data.success){
				if(tokens.length == 1){
					$scope.entity[tokens[0]] = {filename:response.data.name, filepath:response.data.path};
				}else if(tokens.length > 1){
					if($scope.entity[tokens[0]]==null){
						$scope.entity[tokens[0]] = {};
					}
					$scope.entity[tokens[0]][tokens[1]] = {filename:response.data.name, filepath:response.data.path};
				}
			}
			app.log.info("File uploaded successfully for field "+field+", value set as "+$scope.entity[field.name]+"! %o", response);
		}
		
		$scope.onUploadComplete = function(response, field){
			app.log.info("File upload completed for field "+field+"! %o", response);
		}
   	  	//END-UPLOAD-MANAGEMENT

		//START-SUB-ENTITY-MANAGEMENT
		$scope.addSubEntity = function(field){
			if($scope.entity["tmp_"+field.name]!=null){
				if($scope.entity[field.name]==null){
					$scope.entity[field.name] = [];
				}
				$scope.entity[field.name].push($scope.entity["tmp_"+field.name]);
				$scope.entity["tmp_"+field.name]={};
				app.alert.success(field.label+" Added!");
			}
		}
		
		$scope.deleteSubEntity = function(field, subEntity){
			var dlg = app.dialogs.confirm('Confirm Removal',"Are you sure?",["Yeah","May Be!","No Way!"]);
			dlg.result.then(function(btn){
				subEntity.deleted = true;
				app.alert.success(field.label+" Removed!");
			},function(btn){
				
			});			
		}
		//END-SUB-ENTITY-MANAGEMENT
		
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