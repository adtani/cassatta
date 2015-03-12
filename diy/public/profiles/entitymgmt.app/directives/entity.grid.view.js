(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityGridView', ['$q', '$timeout', '$window', '$rootScope', 'httpInterceptor', 'entitymgmtService', 'app', entityMgmtEntityGridView]);

    function entityMgmtEntityGridView($q, $timeout, $window, $rootScope, httpInterceptor, entitymgmtService, app) {
        return {
            restrict: 'EA',
            scope: {
            	domainType: "=?",
            	app: "=",
            	meta: "=?",
            	entities: "=?",
            	onNew: "&",
            	gridOptions:"=?"
            },
            templateUrl: '/profiles/entitymgmt.app/directives/templates/entity.grid.view.html',
            controller: function($scope){
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
           	    	columnDefs : [
           	    	       { name: '0', displayName: '0'},
           	    	       { name: '1', displayName: '0'},
           	    	       { name: '2', displayName: '0'},
           	    	       { name: '3', displayName: '0'},
           	    	       { name: '4', displayName: '0'},
           	    	       { name: '5', displayName: '0'},
           	    	       { name: '6', displayName: '0'},
           	    	       { name: '7', displayName: '0'},
           	    	       { name: '8', displayName: '0'},
           	    	       { name: '9', displayName: '0'},
           	    	       { name: '10', displayName: '0'}
           	   	   	    ],   
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
           	  	
           	  	$scope.deleteEntities = function(){
        			var dlg = app.dialogs.confirm('Confirm Deletion',"Are you sure?",["Yeah","May Be!","No Way!"]);
        			dlg.result.then(function(btn){
        	   	  		var rows = $scope.gridApi.selection.getSelectedGridRows();
        	   	  		var deferred = [];
        	   	  		angular.forEach(rows, function(row){
        	   	  			var entity = row.entity;
        	   	  			entity.deleted = true;
        	   	  			deferred.push(entitymgmtService.saveEntity(entity, $scope.meta.editor.entityType));
        	   	  		});
        	   	  		app.q.all(deferred).then(function(responses){
        	   	  			var successCount = $.grep(responses, function(response){
        		  				return response.success;
        		  			}).length;   	  			
        	  				app.alert.success(successCount+" of  "+deferred.length+" Entities Updated!");
        	   	  		});
        			},function(btn){
        				
        			});			
        		}
           	 
           	  	$scope.refresh = function(){
           	  		if($scope.domainType!=null){
	           	  		entitymgmtService.clearCache();
	           	  		app.meta.getMeta($scope.domainType.domainType).then(function(meta){
	           	  			$scope.meta = meta;
	                		console.log("downloaded meta for "+$scope.domainType.entityType+" is %o ",meta);
	                		$scope.gridOptions.columnDefs = [];
	                		angular.forEach(meta.listView.fields, function(field){
	                			$scope.gridOptions.columnDefs.push(field);
	                		});
	            	   	  	entitymgmtService.loadEntities(meta.listView.entityType, meta.listView.urlFilter).then(function(entities){
	            	   	  		console.log(entities.length+" items loaded ...")
			       	  			angular.forEach(entities, function(entity){
			       	  				entity.domainType = $scope.domainType;
			       	  			});
	            	  	   	    $scope.gridOptions.data = entities;
	            	  	   	    $scope.entities = entities;
	            	  	   	    app.alert.success("Data Refreshed",entities.length + " items loaded for "+meta.listView.entityType+"!");
	            	   	  	});
	                	}, function(response){
	                		console.warn(response);
	                	});
           	  		}
           	  	}
           	  	
        		$scope.saveState = function() {
        			if($scope.gridApi!=null){
        				$scope.state = $scope.gridApi.saveState.save();
        				app.session.store($scope.domainType.entityType+'.grid.state',$scope.state);
        			}
        		};
        		 
        		$scope.restoreState = function() {
        			if($scope.gridApi!=null){
        				$scope.state = app.session.get($scope.domainType.entityType+'.grid.state');
        				$scope.gridApi.saveState.restore( $scope, $scope.state );
        			}
        		};
        		
        		$scope.$watch('domainType', function(newValue, oldValue){
        			if(newValue != oldValue){
        				$scope.refresh();
        			}
        		});

           	  	$scope.$on('entitymgmt.entity.saved', function(event, entities){
           	   	  	app.sqlserver.loadEntity($scope.meta.listView.entityType, entities[0].id).then(function(response){
           	   	  		if(response.success){
           	   	  			var existingEntities = $.grep($scope.gridOptions.data, function(entity){return entity.id==entities[0].id});
           	   	  			if(existingEntities.length > 0){
           	   	  				if(!entities[0].deleted){
           	   	  					$scope.gridOptions.data.splice($scope.gridOptions.data.indexOf(existingEntities[0]),1,response.entity);
           	   	  				}else{
           	   	  					$scope.gridOptions.data.splice($scope.gridOptions.data.indexOf(existingEntities[0]),1);
           	   	  				}
           	   	  			}else{
           	   	  				$scope.gridOptions.data.push(response.entity);
           	   	  			}
           	   	  		}else{
           	   	  			app.alert.warning("Entity Load Failure!");
           	   	  		}
           	   	  	});
           	  	});   	  	
           	  	
    			$scope.restoreState();
           	  	//GRID-MANAGEMENT-END
            }
        };
   	  	

    };
}());