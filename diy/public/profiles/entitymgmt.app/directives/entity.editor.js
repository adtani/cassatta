(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityEditor', ['$q', '$timeout', '$window', '$rootScope', 'httpInterceptor', 'app', entityMgmtEntityEditor]);

    function entityMgmtEntityEditor($q, $timeout, $window, $rootScope, httpInterceptor, app) {
        return {
            restrict: 'EA',
            scope: {
            	entity: "=",
            	meta: "=",
            	onSave: "&"
            },
            templateUrl: '/profiles/entitymgmt.app/directives/templates/entity.editor.html'
        };
    };

}());