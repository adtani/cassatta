(function() {
	
	'use strict';
	
	var app = angular.module('angularApp');

	app.controller('entitymgmtController',
			[ '$rootScope', '$scope', 'app', '$routeParams', 'entitymgmtService', entitymgmtController ]);
	
	function entitymgmtController($rootScope, $scope, app, $routeParams, entitymgmtService) {

		app.log.info("Entity Management controller initialized ...");
		
		$scope.title = "Entity Management";
		
   	  	$scope.initNewEntity = function(){
   	   	  	var entity = {};
   	   	  	$rootScope.$broadcast('entitymgmt.newentity',entity);
   	  	}

	}

})();