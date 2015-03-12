(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtDomainTypeSelector', ['$q', '$timeout', '$rootScope', '$window', '$rootScope', 'httpInterceptor', '$routeParams', 'app', entityMgmtDomainTypeSelector]);

    function entityMgmtDomainTypeSelector($q, $timeout, $rootScope, $window, $rootScope, httpInterceptor, $routeParams, app) {
        return {
            restrict: 'EA',
            templateUrl: '/profiles/entitymgmt.app/directives/templates/domain.type.selector.html',
            scope: {
            	
            },
            controller: function($scope)
            {
            	
				$scope.selectDomainType = function(domainType){
					$scope.domainType = domainType;
					$rootScope.$broadcast('entitymgmt.domaintype.selected', domainType);
				}
				
				$scope.loadDomainTypes = function(){
					if(!$scope.init){
						app.meta.getRegisteredDomainTypes().then(function(domainTypes){
							$scope.init = true;
							$scope.domainTypes = domainTypes;
							$scope.selectDomainType(domainTypes[0]);
						});
					}
				}
				
				function init() {
					$scope.loadDomainTypes();
				}        
				
				init();    	
            }
        };
    };

}());