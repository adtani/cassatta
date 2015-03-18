(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('taskmgmtController',
			[ '$rootScope', '$scope', 'app', 'taskmgmtService', taskmgmtController ]);
	
	function taskmgmtController($rootScope, $scope, app, taskmgmtService) {
		$scope.title = "Task Management";
		$scope.tasks = [];
		
   	  	$scope.initNewTask = function(){
   	   	  	var task = {
   	   	  			parent:null,
   	   	  			parentage:null,
   	   	  			title:"New Task Title ...",
   	   	  			summary:"New Task Summary ...",
   	    	  		priority:0,
   	    	  		dueDate: "2014-01-01",
   	    	  		assignee: $rootScope.session.user,
   	    	  		owner: $rootScope.session.user,
   	    	  		createdDate: new Date(),
   	    	  		uploadedFiles: []
   	 		};
   	   	  	$rootScope.$broadcast('taskmgmt.newtask',task);
   	  	}

   	  	$scope.initNewSubTask = function(){
   	  		var parentTask = $scope.gridApi.selection.getSelectedGridRows()[0].entity;
   	   	  	var task = {
   	   	  			parent: parentTask,
   	   	  			title:"New Task Title ...",
   	   	  			summary:"New Task Summary ...",
   	    	  		priority:0,
   	    	  		dueDate: "2014-01-01",
   	    	  		assignee: $rootScope.session.user,
   	    	  		owner: $rootScope.session.user,
   	    	  		createdDate: new Date(),
   	    	  		uploadedFiles: []
   	 		};
   	   	  	$rootScope.$broadcast('taskmgmt.newtask',task);
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
   	    	columnDefs : [
   	    	    { name: 'parentage', displayName: 'Parents', enableCellEdit: false, allowCellFocus : false},
	            { name: 'id', displayName:'ID', enableCellEdit: false ,allowCellFocus : false },
	            { name: 'priority', displayName: 'Priority', cellClass: 'NEW'},
	            { name: 'status', displayName: 'Status', enableCellEdit: false, allowCellFocus : false,
	            	cellClass: 'NEW'
	            },
	            { name: 'title', displayName: 'Title' },
	            { name: 'assigneeName', displayName: 'Assignee' , enableCellEdit: false,allowCellFocus : false},
	            { name: 'dueDate', displayName: 'Due Date' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"', enableCellEdit: false,allowCellFocus : false}
	   	    ],   
   	  		gridMenuCustomItems: [
                {
                  title: 'Remember Settings',
                  action: function ($event) {
                	  
                  }
                }
              ]
   	  	};
   	  
   	  	$scope.saveRow = function( rowEntity ) {
	   	    // create a fake promise - normally you'd use the promise returned by $http or $resource
	   	    var promise = $q.defer();
	   	    $scope.gridApi.rowEdit.setSavePromise( $scope.gridApi.grid, rowEntity, promise.promise );
	   	   
	   	    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
	   	    app.interval( function() {
	   	      if (rowEntity.id == 0 ){
	   	        promise.reject();
	   	      } else {
	   	        promise.resolve();
	   	      }
	   	    }, 3000, 1);
   	  	}; 
   	  	
   	  	$scope.saveTask = function(){
   	  		taskmgmtService.saveTask($scope.task);
   	  	}
   	  	
   	  	$scope.gridOptions.onRegisterApi = function(gridApi){
	   	    //set gridApi on scope
	   	    $scope.gridApi = gridApi;
	   	    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
	   	    
	   	    gridApi.selection.on.rowSelectionChanged($scope,function(row){
	   	    	var msg = 'row selected ' + row.isSelected;
	   	    	app.log.log(msg);
	   	    	if(row.isSelected){
		   	    	var task = row.entity;
		   	    	$rootScope.$broadcast('taskmgmt.tasks.selected',[task]);
	   	    	}
	   	    });
	  
	   	    gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
	   	    	var msg = 'rows changed ' + rows.length;
	   	    	app.log.log(msg);
	   	    	var selectedTasks = [];
	   	    	angular.forEach(rows, function(row){
	   	    		if(row.isSelected){
	   	    			selectedTasks.push(row.entity);
	   	    		}
	   	    	});
	   	    	if(selectedTasks.length > 0){
	   	    		$rootScope.$broadcast('taskmgmt.tasks.selected',selectedTasks);
	   	    	}
	   	    });	   	    
   	  	};
   	  	
   	  	$scope.completeTasks = function(){
   	  		var rows = $scope.gridApi.selection.getSelectedGridRows();
   	  		var deferred = [];
   	  		angular.forEach(rows, function(row){
   	  			var task = row.entity;
   	  			task.status='DONE';
   	  			deferred.push(taskmgmtService.saveTask(task));
   	  		});
   	  		app.q.all(deferred).then(function(responses){
   	  			var successCount = $.grep(responses, function(response){
	  				return response.success;
	  			}).length;   	  			
  				app.alert.success(successCount+" of  "+deferred.length+" Tasks Updated!");
  				$scope.refresh();
   	  		});
   	  	}
   	 
   	  	$scope.refresh = function(){
   	  		taskmgmtService.clearCache();
	   	  	taskmgmtService.loadTasks().then(function(tasks){
	  	   	    $scope.gridOptions.data = tasks;
	   	  	});
   	  	}
   	  	
		$scope.saveState = function() {
		    $scope.state = $scope.gridApi.saveState.save();
		    app.session.store('mytask.gridstate',$scope.state);
		};
		 
		$scope.restoreState = function() {
		    $scope.gridApi.saveState.restore( $scope, $scope.state );
		};

   	  	$scope.$on('taskmgmt.task.saved', function(event, tasks){
   	   	  	app.sqlserver.loadEntity("org.taskmgmt.tasksview",tasks[0].id).then(function(response){
   	   	  		if(response.success){
   	   	  			if(response.entity.status != 'DONE'){
	   	   	  			var existingTasks = $.grep($scope.gridOptions.data, function(task){return task.id==tasks[0].id});
	   	   	  			if(existingTasks.length > 0){
	   	   	  				$scope.gridOptions.data.splice($scope.gridOptions.data.indexOf(existingTasks[0]),1,response.entity);
	   	   	  			}else{
	   	   	  				$scope.gridOptions.data.push(response.entity);
	   	   	  			}
   	   	  			}
   	   	  		}else{
   	   	  			app.alert.warning("Task Load Failure!");
   	   	  		}
   	   	  	});
   	  	});   	  	
   	  	//GRID-MANAGEMENT-END

		function init() {
			$scope.refresh();
		}

		init();

	}

})();