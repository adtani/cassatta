(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityGridView', ['app', entityMgmtEntityGridView]);

    function entityMgmtEntityGridView(app) {
        return {
            restrict: 'EA',
            scope: {
            	domainType: "=?",
            	app: "=",
            	meta: "=?",
            	multiSelect: "@",
            	entities: "=?",
            	onNew: "&",
            	gridOptions:"=?",
            	onSelect: "&"
            },
            templateUrl: '/directives/entities/templates/entity.grid.view.html',
            controller: function($scope){
           	  	//GRID-MANAGEMENT-START
           	  	$scope.gridOptions = {
           	  		selectionRowHeaderWidth: 35,
           	  		enableRowSelection: true,
           	  		enableSelectAll: true,
           	    	rowHeight: 35,
           	    	showGridFooter:true,
           	    	multiSelect:$scope.multiSelect!=null? $scope.multiSelect : true,
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
           	  	
           	  	$scope.newEntity = function(){
           	  		$scope.onNew({domainType: $scope.domainType});
           	  	}
           	  	
           	  	$scope.saveRow = function( rowEntity ) {
        	   	    // create a fake promise - normally you'd use the promise returned by $http or $resource
        	   	    var promise = app.q.defer();
        	   	    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
        	   	   
        	   	    app.entities.saveEntity(rowEntity, $scope.meta.editor.entityType).then(function(){
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
        		   	    	$scope.onSelect({entities: [task]});
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
        	   	    		$scope.onSelect({entities: selectedEntities});
        	   	    	}
        	   	    });	  

           	  	};
           	  	
           	  	$scope.launchCustomAction = function(action){
    	   	  		var rows = $scope.gridApi.selection.getSelectedGridRows();
    	   	  		var deferred = [];
	   	  			var entities = (rows!=null && rows.length > 0)? $.map(rows, function(row, i){return row.entity}) : null;
           	  		try{
           	  			action.execute(app, $scope, entities);
           	  		}catch(exception){
           	  			console.warn("Error while launching custom action! %o",exception)
           	  			app.alert.warning("Error!","Error while launching custom action! ");
           	  		}
           	  	}
           	  	
           	  	$scope.deleteEntities = function(){
        			var dlg = app.dialogs.confirm('Confirm Deletion',"Are you sure?",["Yeah","May Be!","No Way!"]);
        			dlg.result.then(function(btn){
        	   	  		var rows = $scope.gridApi.selection.getSelectedGridRows();
        	   	  		var deferred = [];
        	   	  		angular.forEach(rows, function(row){
        	   	  			var entity = row.entity;
        	   	  			entity.deleted = true;
        	   	  			deferred.push(app.entities.saveEntity(entity, $scope.meta.editor.entityType));
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
	           	  		app.entities.clearCache();
	           	  		app.meta.getMeta($scope.domainType.domainType).then(function(meta){
	           	  			$scope.meta = meta;
	                		$scope.gridOptions.columnDefs = [];
	                		angular.forEach(meta.listView.fields, function(field){
	                			$scope.gridOptions.columnDefs.push(field);
	                		});
	            	   	  	app.entities.loadEntities(meta.listView.entityType, meta.listView.urlFilter).then(function(entities){
			       	  			angular.forEach(entities, function(entity){
			       	  				entity.domainType = $scope.domainType;
			       	  			});
	            	  	   	    $scope.gridOptions.data = entities;
	            	  	   	    $scope.entities = entities;
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
           	  		var entitiesMatchingEntityType = $.grep($scope.gridOptions.data, function(entity){return entities[0].domainType.name == $scope.domainType.name});
           	  		if(entitiesMatchingEntityType.length > 0){
	   	   	  			var matchingEntities = $.grep($scope.gridOptions.data, function(entity){return entity.id==entities[0].id && entities[0].domainType.name == entity.domainType.name});
	           	  		if(!entities[0].deleted){
		           	   	  	app.sqlserver.loadEntity($scope.meta.listView.entityType, entities[0].id).then(function(response){
		           	   	  		if(response.success){
			       	  				response.entity.domainType = $scope.domainType;
		           	   	  			if(matchingEntities.length > 0){
	           	   	  					$scope.gridOptions.data.splice($scope.gridOptions.data.indexOf(matchingEntities[0]),1,response.entity);
		           	   	  			}else{
		           	   	  				$scope.gridOptions.data.push(response.entity);
		           	   	  			}
		           	   	  		}else{
		           	   	  			app.alert.warning("Entity Load Failure!");
		           	   	  		}
		           	   	  	});
	           	  		}else{
	           	  			if(matchingEntities.length>0){
	           	  				$scope.gridOptions.data.splice($scope.gridOptions.data.indexOf(matchingEntities[0]),1);
	           	  			}
	           	  		}
           	  		}
           	  	});   	  	
           	  	
    			$scope.restoreState();
    			$scope.refresh();
           	  	//GRID-MANAGEMENT-END
            }
        };
   	  	

    };
}());