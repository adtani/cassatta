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
	   	  		
	   	  		entitymgmtService.loadReferences($scope.entity, $scope.meta);
	   	  		setPanelType();
   	  	});
   	  	
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
		
   	  	$scope.onSave = function(){
   	  		console.log("onSave done!");
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

		
		$scope.selectEntity = function(entity){
			$scope.domainType = entity;
	   	  	app.meta.getMeta($scope.domainType.entityType).then(function(meta){
	    		$scope.meta = meta;
	    	}, function(response){
	    		console.warn(response);
	    	});   	  		
		}

		function init() {
			// initialization code goes here...
			setPanelType();
			$scope.initEntityType();
		}

		init();

	}

})();