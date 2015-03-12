(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityEditor', ['$q', '$timeout', '$window', '$rootScope', 'httpInterceptor', 'app', entityMgmtEntityEditor]);

    function entityMgmtEntityEditor($q, $timeout, $window, $rootScope, httpInterceptor, app) {
        return {
            restrict: 'EA',
            scope: {
            	action: "@",
            	showDelete: "@",
            	app: "=",
            	entity: "=",
            	meta: "=",
            	field: "=",
            	containerEntity: "=",
            	saveEntity: "&onSave",
            	resetEntity: "&onReset",
            	deleteEntity: "&onDelete"
            },
            templateUrl: '/profiles/entitymgmt.app/directives/templates/entity.editor.html',
            controller: function($scope){
            	//START-LOOKUP-MANAGEMENT
           	  	$scope.results = [{id:1,name:"result1",displaytext:"result1text"},{id:2,name:"result2",displaytext:"result2text"}];
           	  	
           	  	$scope.searchEntities = function(fieldName, entityType, pattern){
           	  		if(pattern.length > 2){
        		   	 	app.sqlserver.loadEntities(entityType).then(function(response){
        		    		if(response.success){
        		   		   	  	app.meta.getMeta(entityType).then(function(entityMeta){
        		   		    		$scope.results[fieldName] = $.grep(response.entities, function(entity){
        			   		   	  		var matchedFields = $.grep(entityMeta.editor.tabs[0].fields, function(field){
        			   		   	  			return field.searchable == true && entity[field.name].indexOf(pattern) >= 0;
        			   		   	  		});
        			   		   	  		return matchedFields.length > 0;
        			    			});		   
        		   		    		angular.forEach($scope.results[fieldName], function(result){
        		   		    			var searchableFields = $.grep(entityMeta.editor.tabs[0].fields, function(field){
        			   		   	  			return field.searchable == true;
        			   		   	  		});
        		   		    			result.display = "["+result.id+"]: "+result[searchableFields[0].name];
        		   		    		});
        		   		    	}, function(response){
        		   		    		console.warn(response);
        		   		    	});   	  			
        		    		}else{
        		    			app.alert.warning('Warning','Search Failure');
        						app.location.path("/login");
        		    		}
        		    	});   	  		
           	  		}
           	  	};            	
            	//END-LOOKUP-MANAGEMENT
            	
          	  	//START-UPLOAD-MANAGEMENT
        		$scope.progress = 0;
        		$scope.max = 100;
        		$scope.uploadedFiles = [];
           	  	
        		function startProgress(){
        			var newvalue = Math.floor((Math.random() * 100) + 1);
        			if(newvalue > $scope.progress && newvalue - $scope.progress <= 20){
        				$scope.progress = newvalue;
        			}
        		}
        		
        		$scope.onUploadStart = function(files,field){
        			$scope.progress = 0;
        			$scope.animation = app.interval(startProgress,500);
        			app.log.info("File uploade started for field "+field+"! %o", files);
        		}
        		
        		$scope.onUploadError = function(response, field){
        			$scope.progress = 0; 
        			app.interval.cancel($scope.animation);
        			app.log.info("File upload failed for field "+field+"! %o", response);
        		}
        		
        		$scope.onUploadSuccess = function(response, field){
        			var tokens = field.split(":");
        			$scope.progress = 100; 
        			app.interval.cancel($scope.animation);
        			if(response.data.success){
    					$scope.entity[field] = response.data.name+":"+response.data.path;
        			}
        			app.log.info("File uploaded successfully for field "+field+", value set as "+$scope.entity[field.name]+"! %o", response);
        		}
        		
        		$scope.onUploadComplete = function(response, field){
        			app.log.info("File upload completed for field "+field+"! %o", response);
        		}
           	  	//END-UPLOAD-MANAGEMENT    

            }
        };
   	  	

    };
}());