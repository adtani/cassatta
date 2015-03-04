(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('entitymgmtController',
			[ '$rootScope', '$scope', 'app', '$routeParams', 'entitymgmtService', entitymgmtController ]);
	
	function entitymgmtController($rootScope, $scope, app, $routeParams, entitymgmtService) {

		app.log.info("Entity Management controller initialized ...");
		
		$scope.entityTypes = [
		      {
		    	  name:"Users",
		    	  entityType:"org.users",
		    	  listViewEntityType:"org.users"
		      },
		      {
		    	  name:"Tasks",
		    	  entityType:"org.taskmgmt.tasks",
		    	  listViewEntityType:"org.taskmgmt.tasksview"
		      }	
		];
		
		$scope.title = "Entity Management";
		
		//TODO: tasks - rename these to entities
		$scope.tasks = [];
		
   	  	$scope.initNewEntity = function(){
   	   	  	var entity = {};
   	   	  	$rootScope.$broadcast('entitymgmt.newentity',entity);
   	  	}

   	  	//GRID-MANAGEMENT-START
   	  	$scope.gridOptions = {
   	  		selectionRowHeaderWidth: 35,
   	  		enableRowSelection: true,
   	  		enableSelectAll: true,
   	    	rowHeight: 35,
   	    	showGridFooter:true,
   	    	multiSelect:true,
   	    	enableColumnResizing: true,
   	    	enablePagination : true,
   	    	enableGridMenu :true,
   	    	paginationPageSizes: [25, 50, 75],
   	    	paginationPageSize: 25,
   	    	enableFiltering : true,
   	    	columnDefs : [],
   	  		gridMenuCustomItems: [
                {
                  title: 'Remember Settings',
                  action: function ($event) {
                	  $scope.saveState();
                  }
                }
            ]
   	  	};
   	  	
   	  	$scope.saveRow = function( rowEntity ) {
	   	    // create a fake promise - normally you'd use the promise returned by $http or $resource
	   	    var promise = app.q.defer();
	   	    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
	   	   
	   	    entitymgmtService.saveEntity(rowEntity, $scope.meta.editor.entityType).then(function(){
	   	    	promise.resolve();
	   	    });
	   	    
	   	    //TODO: Remove temporary code..
	   	    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
//	   	    app.interval( function() {
//	   	      if (rowEntity.id == 0 ){
//	   	        promise.reject();
//	   	      } else {
//	   	        promise.resolve();
//	   	      }
//	   	    }, 3000, 1);
   	  	}; 
   	  	
   	  	$scope.gridOptions.onRegisterApi = function(gridApi){
	   	    //set gridApi on scope
	   	    $scope.gridApi = gridApi;
	   	    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
	   	    
	   	    gridApi.selection.on.rowSelectionChanged($scope,function(row){
	   	    	var msg = 'row selected ' + row.isSelected;
	   	    	app.log.log(msg);
	   	    	if(row.isSelected){
		   	    	var task = row.entity;
		   	    	$rootScope.$broadcast('entitymgmt.entity.selected',[task]);
	   	    	}
	   	    });
	  
	   	    gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
	   	    	var msg = 'rows changed ' + rows.length;
	   	    	app.log.log(msg);
	   	    	var selectedEntities = [];
	   	    	angular.forEach(rows, function(row){
	   	    		if(row.isSelected){
	   	    			selectedEntities.push(row.entity);
	   	    		}
	   	    	});
	   	    	if(selectedEntities.length > 0){
	   	    		$rootScope.$broadcast('entitymgmt.entity.selected',selectedEntities);
	   	    	}
	   	    });	   	    
   	  	};
   	  	
//   	  	$scope.completeEntities = function(){
//   	  		var rows = $scope.gridApi.selection.getSelectedGridRows();
//   	  		var deferred = [];
//   	  		angular.forEach(rows, function(row){
//   	  			var task = row.entity;
//   	  			task.status='DONE';
//   	  			deferred.push(entitymgmtService.saveEntity(task));
//   	  		});
//   	  		app.q.all(deferred).then(function(responses){
//   	  			var successCount = $.grep(responses, function(response){
//	  				return response.success;
//	  			}).length;   	  			
//  				app.alert.success(successCount+" of  "+deferred.length+" Entities Updated!");
//  				$scope.refresh();
//   	  		});
//   	  	}
   	 
   	  	$scope.refresh = function(){
   	  		entitymgmtService.clearCache();
   	  		app.meta.getMeta($scope.domainType.entityType).then(function(meta){
   	  			$scope.meta = meta;
        		console.log("downloaded meta for "+$scope.domainType.entityType+" is %o ",meta);
        		angular.forEach(meta.listView.fields, function(field){
        			$scope.gridOptions.columnDefs.push(field);
        		});
    	   	  	entitymgmtService.loadEntities(meta.listView.entityType, meta.listView.urlFilter).then(function(entities){
    	  	   	    $scope.gridOptions.data = entities;
    	   	  	});
        	}, function(response){
        		console.warn(response);
        	});
   	  	}
   	  	
		$scope.saveState = function() {
			if($scope.gridApi!=null){
				$scope.state = $scope.gridApi.saveState.save();
				app.session.store('mytask.gridstate',$scope.state);
			}
		};
		 
		$scope.restoreState = function() {
			if($scope.gridApi!=null){
				$scope.state = app.session.get('mytask.gridstate');
				$scope.gridApi.saveState.restore( $scope, $scope.state );
			}
		};

   	  	$scope.$on('entitymgmt.entity.saved', function(event, entities){
   	   	  	app.sqlserver.loadEntity("org.taskmgmt.tasksview",entities[0].id).then(function(response){
   	   	  		if(response.success){
//   	   	  			if(response.entity.status != 'DONE'){
	   	   	  			var existingEntities = $.grep($scope.gridOptions.data, function(entity){return entity.id==entities[0].id});
	   	   	  			if(existingEntities.length > 0){
	   	   	  				$scope.gridOptions.data.splice($scope.gridOptions.data.indexOf(existingEntities[0]),1,response.entity);
	   	   	  			}else{
	   	   	  				$scope.gridOptions.data.push(response.entity);
	   	   	  			}
//   	   	  			}
   	   	  		}else{
   	   	  			app.alert.warning("Entity Load Failure!");
   	   	  		}
   	   	  	});
   	  	});   	  	
   	  	//GRID-MANAGEMENT-END


		function selectEntity(entity){
			$scope.domainType = entity;
			$scope.refresh();
		}

		function initEntityType(){
			if($routeParams.action != null){
				selectEntity($.grep($scope.entityTypes, function(entity){
					return entity.entityType == $routeParams.action;
				})[0]);
			}else{
				app.location.path("/welcome/entitymgmt/"+$scope.entityTypes[0].entityType);
			}
		}
		
		function init() {
			$scope.restoreState();
			initEntityType();
		}

		init();

	}

})();