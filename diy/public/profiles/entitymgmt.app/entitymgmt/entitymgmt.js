(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('entitymgmtController',
			[ '$rootScope', '$scope', 'app', '$routeParams', entitymgmtController ]);
	
	function entitymgmtController($rootScope, $scope, app, $routeParams) {

		$scope.mainEntity = "Entity";
		$scope.title = $scope.mainEntity+" Management";

		//START-DOMAIN-TYPE-CHANGE-HANDLING
		function initDomainTypes(){
			app.meta.getRegisteredDomainTypes().then(function(domainTypes){
				$scope.domainTypes = domainTypes;
				$scope.domainTypeSelected(domainTypes[0]);
			});
		}
   	  	
   	  	$scope.$on('entitymgmt.entity.selected', function(event, entities){
   	  		var entity = entities[entities.length-1];
   	  		selectEntity(entity);
   	  	});
   	  	
   	  	function selectEntity(entity){
	  		selectEditorDomainType(entity.domainType);
	   	  	app.meta.getMeta(entity.domainType.domainType).then(function(meta){
	   	  		if(entity.id!=null){
			   	  	app.sqlserver.loadEntity(meta.editor.entityType, entity.id).then(function(response){
			   	  		if(response.success){
				   	  		app.entities.loadReferences(entity, meta);
					  		$scope.entity = entity;
							setEditorPanel();		   	  			
			   	  		}else{
			   	  			app.alert.warning($scope.mainEntity+" Load Failure!");
			   	  		}
			   	  	});   	  		
	   	  		}else{
	   	  			$scope.entity = entity;
	   	  		}
	    	}, function(response){
	    		console.warn(response);
	    	});                  		
   	  	}
   	  	
   	  	$scope.domainTypeSelected = function(domainType){
   	  		$scope.domainType = domainType;
			$scope.editorDomainType = domainType;
			$scope.entity = null;
			
			require(["metadata/"+domainType.domainType.split('.').join('/')+".logic"], function(customLogic) {
				var actions = customLogic.getActions();
				angular.forEach(actions, function(action){
					console.log("#loaded plugin: "+domainType.domainType+" => custom.logic.action :: "+action.name);
				});
			});
	
	   	  	app.meta.getMeta($scope.domainType.domainType).then(function(meta){
//	    		$scope.meta = meta;
	    		$scope.editorMeta = meta;
	    		setEditorPanel();
	    	}, function(response){
	    		console.warn(response);
	    	});                  	
   	  	}
   	  	
		function selectEditorDomainType(domainType){
			$scope.editorDomainType = domainType;
			$scope.entity = null;
	   	  	app.meta.getMeta(domainType.domainType).then(function(meta){
	    		$scope.editorMeta = meta;
	    	}, function(response){
	    		console.warn(response);
	    	});                  		
		}
		//END-DOMAIN-TYPE-CHANGE-HANDLING

		//START-EVENT-HANDLING
   	  	$scope.newEntity = function(domainType){
   	  		var entity = app.entities.newEntity(domainType);
			selectEntity(entity);
		}
   	  	
   	  	function setEditorPanel(){
   	  		$scope.panelType = $scope.entity != null? ($scope.entity.id != null ? "panel-primary" : "panel-success") : "panel-info";
   	  		$scope.title = $scope.entity != null? ($scope.entity.id != null ? "Edit "+$scope.mainEntity+" - " + $scope.entity.entityType+" ["+$scope.entity.id+"]" : "New "+$scope.mainEntity+" - "+ $scope.entity.entityType ) : $scope.mainEntity+" Editor";
   	  	}
   	 
   	  	$scope.deleteEntity = function(){
			var dlg = app.dialogs.confirm('Confirm Deletion',"Are you sure?",["Yeah","May Be!","No Way!"]);
			dlg.result.then(function(btn){
				$scope.entity.deleted = true;
				app.entities.saveEntity($scope.entity, $scope.editorMeta.editor.entityType).then(function(){
	   	  			setPanelType();
	   	  		});
				app.alert.success(field.label+" Removed!");
			},function(btn){
				
			});			
		}

   	  	$scope.saveEntity = function(){
   	  		app.entities.saveEntity($scope.entity, $scope.editorMeta.editor.entityType).then(function(){
   				setEditorPanel();
   	  		});
   	  	} 
   	  	//END-EVENT-HANDLING
   	  	
   	  	function init(){
   	  		if($routeParams.action == 'editor'){
   	  			var domainTypeArg = $routeParams.arg1;
   	  			var entityId = $routeParams.arg2;
   	  			//retrieve domain types... 
	   	  		app.meta.getRegisteredDomainTypes().then(function(domainTypes){
					$scope.domainTypes = domainTypes;
					var domainType = $.grep(domainTypes, function(dType){return dType.domainType == domainTypeArg})[0];
					//retrieve meta data for domain type...
			   	  	app.meta.getMeta(domainType.domainType).then(function(meta){
			   	  		//retrieve entity...
				   	  	app.sqlserver.loadEntity(meta.editor.entityType, entityId).then(function(response){
				   	  		if(response.success){
				   	  			//retrieve entity references ...
					   	  		app.entities.loadReferences(response.entity, meta);
					   	  		$scope.domainType = domainType;
						  		$scope.entity = response.entity;
						  		$scope.entity.domainType = $scope.domainType;
//						  		$scope.meta = meta;
						  		$scope.editorMeta = meta;
								setEditorPanel();		   	  			
				   	  		}else{
				   	  			app.alert.warning($scope.mainEntity+" Load Failure!");
				   	  		}
				   	  	});   	  		
			    	}, function(response){
			    		console.warn(response);
			    	});                  		
				});   	  			
   	  		}else{
   	  			initDomainTypes();
   	  		}
   	  	}
   	  	
   	  	init();

	}

})();