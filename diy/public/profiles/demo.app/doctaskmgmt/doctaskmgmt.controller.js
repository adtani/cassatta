(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');
	
	app.filter('propsFilter', function() {
		  return function(items, props) {
		    var out = [];

		    if (angular.isArray(items)) {
		      items.forEach(function(item) {
		        var itemMatches = false;

		        var keys = Object.keys(props);
		        for (var i = 0; i < keys.length; i++) {
		          var prop = keys[i];
		          var text = props[prop].toLowerCase();
		          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
		            itemMatches = true;
		            break;
		          }
		        }

		        if (itemMatches) {
		          out.push(item);
		        }
		      });
		    } else {
		      // Let the output be the input untouched
		      out = items;
		    }

		    return out;
		  }
		});	

	app.controller('taskmgmtController',
			[ '$rootScope', '$scope', 'app', taskmgmtController ]);

	
	function taskmgmtController($rootScope, $scope, app) {

		app.log.info("Task controller initialized ...");

		$scope.tasks = [];
		$scope.users = [];

		$scope.priority = {};
   	  	$scope.priorities = [ 
   	  	    {name: 'Low', code: '0'},
	    	{name: 'Medium', code: '5'},
	    	{name: 'High', code: '10'}
   	  	];		

   	  	
   	  	$scope.searchUsers = function(pattern){
   	  		if(pattern.length > 2){
		   	 	app.docserver.loadEntities("users").then(function(response){
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
   	  	
   	  	$scope.resetTask = function(){
   	  		$scope.initTask();
   	  	}
   	  	
   	  	$scope.initTask = function(){
   	   	  	$scope.task = {
   	    	  		priority:{name: 'Low', code: '0'},
   	    	  		dueDate: new Date(),
   	    	  		assignedTo: $rootScope.session.user,
   	    	  		owner: $rootScope.session.user,
   	    	  		createdDate: new Date()
   	 		};
   	  	}
   	  	
   	  	$scope.saveTask = function(){
   	  		var task = $scope.task;
   	   	  	var taskToBeSaved = {};
   	   	  	angular.copy($scope.task, taskToBeSaved);

   	   	  	taskToBeSaved.entityType = "tasks";
   	  		taskToBeSaved.assignedTo = "/users"+task.assignedTo.login;
   	  		taskToBeSaved.owner="/users"+task.owner.login;
   	  		taskToBeSaved.createdDate = new Date();
	   	 	app.docserver.saveEntity(taskToBeSaved).then(function(response){
	    		if(response.success){
	    			app.alert.success("Success!","Task Saved!");
					app.location.path("/welcome/taskmgmt");
	    		}else{
	    			app.alert.warning('Warning','Failure while saving task!');
	    		}
	    	});   	  		   	  		
   	  	}

		//START-DATE-MANAGEMENT
		$scope.today = function() {
			$scope.dt = new Date();
		};
		
		$scope.clear = function() {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		
		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear : 'yy',
			startingDay : 1
		};

		$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy',
				'shortDate' ];
		$scope.format = $scope.formats[0];
		//END-DATE-MANAGEMENT

		
		function init() {
			// initialization code goes here...
			$scope.today();
			$scope.toggleMin();
			$scope.initTask();
		}

		init();

	}

})();