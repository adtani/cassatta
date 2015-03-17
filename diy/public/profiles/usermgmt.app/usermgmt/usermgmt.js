(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('usermgmtController',
			[ '$rootScope', '$scope', 'app', '$routeParams', 'entitymgmtService', usermgmtController ]);
	
	function usermgmtController($rootScope, $scope, app, $routeParams, entitymgmtService) {

		$scope.mainEntity = "User";
		$scope.title = ""+$scope.mainEntity+" Management";

		//START-EVENT-HANDLING
		app.meta.getRegisteredDomainTypes().then(function(domainTypes){
			$scope.domainTypes = domainTypes;
			$scope.documentsDomainType = $.grep(domainTypes, function(dType){return dType.name == "Users"})[0]
			$scope.domainTypeSelected($scope.documentsDomainType);
		});
   	  	
   	  	$scope.$on('entitymgmt.entity.selected', function(event, entities){
   	  		var entity = entities[entities.length-1];
   	  		selectEntity(entity);
   	  	});
   	  	
   	  	function selectEntity(entity){
	  		selectEditorDomainType(entity.domainType);
	   	  	app.meta.getMeta(entity.domainType.domainType).then(function(meta){
	   	  		entitymgmtService.loadReferences(entity, meta);
		  		$scope.entity = entity;
		  		$scope.meta = meta;
				setEditorPanel();
	    	}, function(response){
	    		console.warn(response);
	    	});                  		
   	  	}
   	  	
   	  	$scope.domainTypeSelected = function(domainType){
   	  		$scope.domainType = domainType;
			$scope.editorDomainType = domainType;
			$scope.entity = null;
	   	  	app.meta.getMeta($scope.domainType.domainType).then(function(meta){
	    		$scope.meta = meta;
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

   	  	$scope.newEntity = function(domainType){
   	  		var entity = entitymgmtService.newEntity(domainType);
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
				entitymgmtService.saveEntity($scope.entity, $scope.meta.editor.entityType).then(function(){
	   	  			setPanelType();
	   	  		});
				app.alert.success(field.label+" Removed!");
			},function(btn){
				
			});			
		}

   	  	$scope.saveEntity = function(){
   	  		entitymgmtService.saveEntity($scope.entity, $scope.meta.editor.entityType).then(function(){
   				setEditorPanel();
   	  		});
   	  	} 
   	  	//END-EVENT-HANDLING

	}

})();