(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityEditor', ['app', entityMgmtEntityEditor]);
    
	myApp.controller('entitySearchDialog',['$scope', '$modalInstance', 'data', 'app', function($scope,$modalInstance,data, app){
		$scope.data = data;
		$scope.data.newentity = app.entities.newEntity($scope.data.domainType);

		$scope.saveEntity = function(){
   	  		app.entities.saveEntity($scope.data.newentity, $scope.data.meta.editor.entityType).then(function(){
   	  			$modalInstance.close($scope.data.newentity);
   	  		});
		}
		
   	  	$scope.selectEntity = function(entities){
   	  		if(entities.length > 0){
	   	  		var entity = entities[entities.length-1];
	   	  		$scope.data.entity = entity;
   	  		}else{
   	  			$scope.data.entity = null;
   	  		}
   	  	};

		$scope.cancel = function(){
			$modalInstance.dismiss(null);
		}; 
		
		$scope.save = function(){
			$modalInstance.close($scope.data.entity);
		}; 
		
	}]) 

    function entityMgmtEntityEditor(app) {
        return {
            restrict: 'EA',
            scope: {
            	action: "@",
            	showDelete: "@",
            	showExpand: "@",
            	app: "=",
            	entity: "=?",
            	meta: "=?",
            	field: "=?",
            	containerEntity: "=",
            	panelType: "=",
            	title: "=",
            	saveEntity: "&onSave",
            	deleteEntity: "&onDelete"
            },
            templateUrl: '/directives/entities/templates/entity.editor.html',
            controller: function($scope){
            	
	    		//START-DATE-MANAGEMENT
	    		// Disable weekend selection
	    		$scope.disabled = function(date, mode) {
	    			return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
	    		};
	
	    		$scope.open = function($event) {
	    			$event.preventDefault();
	    			$event.stopPropagation();
	    			$scope.opened = true;
	    		};
	    		
	    		$scope.minDate = new Date();
	
	    		$scope.dateOptions = {
	    			formatYear : 'yy',
	    			startingDay : 1
	    		};
	
	    		$scope.formats = [ 'yyyy-MM-dd', 'yyyy-MM-dd HH:mm:ss', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy',
	    				'shortDate' ];
	    		$scope.format = $scope.formats[0];
	    		//END-DATE-MANAGEMENT
	       	  	
	        	
	        	//START-LOOKUP-MANAGEMENT
	       	  	$scope.results = [{id:1,name:"result1",displaytext:"result1text"},{id:2,name:"result2",displaytext:"result2text"}];
	       	  	
	       	  	$scope.showEntitySearchDialog = function(field){
	       	  		app.meta.getRegisteredDomainType(field.domainType).then(function(domainType){
			       	  	var dlg = app.dialogs.create('/directives/entities/templates/entity.search.html','entitySearchDialog',{domainType:domainType, field:field, meta:field.meta}, {windowClass:'search-modal-window'});
						dlg.result.then(function(entity){
							if(entity!=null){
			       	  			app.meta.getMeta(field.domainType).then(function(entityMeta){
    		   		    			var searchableFields = $.grep(entityMeta.editor.tabs[0].fields, function(field){
    			   		   	  			return field.searchable == true;
    			   		   	  		});
    		   		    			entity.display = "["+entity.id+"]: "+entity[searchableFields[0].name];
			       	  			});	       	  			
								$scope.entity[field.name] = entity;
							}
						},function(){
							if(angular.equals($scope.name,''))
								$scope.name = 'You did not enter in your name!';
						});
	       	  		});
	       	  	};
	       	  	
	       	  	$scope.searchEntities = function(fieldName, domainType, pattern){
	       	  		if(pattern.length > 2){
	       	  			app.meta.getMeta(domainType).then(function(entityMeta){
		    		   	 	app.sqlserver.loadEntities(entityMeta.editor.entityType).then(function(response){
		    		    		if(response.success){
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
		    		    		}else{
		    		    			app.alert.warning('Warning','Search Failure');
		    						app.location.path("/login");
		    		    		}
		    		    	});   	  		
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
	    		
	    		$scope.fullscreen = function(){
	    			app.location.path("/welcome/entitymgmt/editor/"+$scope.entity.domainType.domainType+"/"+$scope.entity.id);
	    		}
	
            }
        };

    };
}());