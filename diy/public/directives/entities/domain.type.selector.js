(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtDomainTypeSelector', ['app', entityMgmtDomainTypeSelector]);

    function entityMgmtDomainTypeSelector(app) {
        return {
            restrict: 'EA',
            templateUrl: '/directives/entities/templates/domain.type.selector.html',
            scope: {
            	domainType : "=",
            	domainTypes : "=",
            	onSelect : "&"
            },
            controller:function($scope){
            	$scope.selectDomain = function(index){
            		$scope.domainType = $scope.domainTypes[index];
            		$scope.onSelect({domainType: $scope.domainType});
            	}
            }
        };
    };

}());