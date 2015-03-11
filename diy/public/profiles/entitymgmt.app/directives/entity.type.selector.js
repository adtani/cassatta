(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityTypeSelector', ['$q', '$timeout', '$window', '$rootScope', 'httpInterceptor', 'app', entityMgmtEntityTypeSelector]);

    function entityMgmtEntityTypeSelector($q, $timeout, $window, $rootScope, httpInterceptor, app) {
        return {
            restrict: 'EA',
            templateUrl: '/profiles/entitymgmt.app/directives/templates/entity.type.selector.html'
        };
    };

}());