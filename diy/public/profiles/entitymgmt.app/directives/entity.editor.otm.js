(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityEditorOtm', ['$q', '$timeout', '$window', '$compile', '$rootScope', 'httpInterceptor', 'app', entityMgmtEntityEditorOtm]);

    function entityMgmtEntityEditorOtm($q, $timeout, $window, $compile, $rootScope, httpInterceptor, app) {
        return {
            restrict: 'EA',
            scope: {
            	entity: "=",
            	field: "="
            },
            templateUrl: '/profiles/entitymgmt.app/directives/templates/entity.editor.otm.html',
            link: function (scope, element, attrs) {
            	var editor = $('#editor');
                if(editor!=null){
                	editor.append("<div entitymgmt-entity-editor entity=\"entity['_tmp'+field.name]\" meta=\"field.meta\"></div>");
                	$compile(element.contents())(scope);
                }
            }
        };
    };

}());