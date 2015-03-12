(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('entitymgmtController',
			[ '$rootScope', '$scope', 'app', '$routeParams', 'entitymgmtService', entitymgmtController ]);
	
	function entitymgmtController($rootScope, $scope, app, $routeParams, entitymgmtService) {

		$scope.title = "Entity Management";

		//START-DOMAIN-TYPE-CHANGE-HANDLING
   	  	$scope.$on('entitymgmt.domaintype.selected', function(event, domainType){
			selectDomainType(domainType);   		
			setEditorPanel();
		});
   	  	
   	  	$scope.$on('entitymgmt.entity.selected', function(event, entities){
   	  		$scope.entity = entities[entities.length-1];
   	  		entitymgmtService.loadReferences($scope.entity, $scope.meta);
			setEditorPanel();
   	  	});
   	  	
		function selectDomainType(domainType){
			$scope.domainType = domainType;
			$scope.entity = null;
	   	  	app.meta.getMeta($scope.domainType.entityType).then(function(meta){
	    		$scope.meta = meta;
	    	}, function(response){
	    		console.warn(response);
	    	});                  		
		}
		//END-DOMAIN-TYPE-CHANGE-HANDLING

		//START-EVENT-HANDLING
   	  	$scope.resetEntity = function(){
   	  		console.warn("Not implemented!");
   	  	}
   	  	
   	  	$scope.newEntity = function(){
			$scope.entity = {
				entityType:$scope.meta.editor.entityType
			};			
			setEditorPanel();
		}
   	  	
   	  	function setEditorPanel(){
   	  		$scope.panelType = $scope.entity != null? ($scope.entity.id != null ? "panel-primary" : "panel-success") : "panel-info";
   	  		$scope.title = $scope.entity != null? ($scope.entity.id != null ? "Edit Entity - " + $scope.entity.entityType+" ["+$scope.entity.id+"]" : "New Entity - "+ $scope.entity.entityType ) : "Entity Editor";
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