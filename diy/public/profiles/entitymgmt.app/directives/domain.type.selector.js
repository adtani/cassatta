(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtDomainTypeSelector', ['$q', '$timeout', '$rootScope', '$window', '$rootScope', 'httpInterceptor', '$routeParams', 'app', entityMgmtDomainTypeSelector]);

    function entityMgmtDomainTypeSelector($q, $timeout, $rootScope, $window, $rootScope, httpInterceptor, $routeParams, app) {
        return {
            restrict: 'EA',
            templateUrl: '/profiles/entitymgmt.app/directives/templates/domain.type.selector.html',
            scope: {
            	domainType : "=",
            	domainTypes : "="
            },
            controller:function($scope){
            	$scope.selectDomain = function(domainType){
            		$scope.domainType = domainType;
            	}
            }
        };
    };

}());