(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('entityEditorController',
			[ '$rootScope', '$scope', '$routeParams', 'app', 'entitymgmtService', entityEditorController ]);
	
	function entityEditorController($rootScope, $scope, $routeParams, app, entitymgmtService) {

		app.log.info("AddEntity controller initialized ...");

		$scope.title = "Entity Editor";
		$scope.users = [];

		$scope.priority = 0;
   	  	$scope.priorities = [0,1,2,3,4,5];		
   	  	$scope.entity = null;
   	  	
		//START-DOMAIN-TYPE-CHANGE-HANDLING
   	  	$scope.$on('entitymgmt.domaintype.selected', function(event, domainType){
			selectDomainType(domainType);   			
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

		app.meta.getRegisteredDomainTypes().then(function(domainTypes){
			selectDomainType(domainTypes[0]);
		}); 
		//END-DOMAIN-TYPE-CHANGE-HANDLING
		
   	  	$scope.resetEntity = function(){
   	  		$scope.initEntity();
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

	}

})();