(function() {

    var myApp = angular.module('angularApp');
    myApp.directive('entitymgmtEntityEditorOtm', ['$q', '$timeout', '$window', '$compile', '$rootScope', 'httpInterceptor', 'app', entityMgmtEntityEditorOtm]);

    function entityMgmtEntityEditorOtm($q, $timeout, $window, $compile, $rootScope, httpInterceptor, app) {
        return {
            restrict: 'EA',
            scope: {
            	app: "=",
            	entity: "=",
            	field: "="
            },
            controller: function($scope){
        		//START-SUB-ENTITY-MANAGEMENT
        		$scope.addSubEntity = function(){
        			if($scope.entity["_new_"+$scope.field.name]!=null){
        				if($scope.entity[$scope.field.name]==null){
        					$scope.entity[$scope.field.name] = [];
        				}
        				$scope.entity[$scope.field.name].push($scope.entity["_new_"+$scope.field.name]);
        				$scope.entity["_new_"+$scope.field.name]={};
        				app.alert.success($scope.field.label+" Added!");
        			}
        		}
        		
        		$scope.deleteSubEntity = function(field, subEntity){
        			var dlg = app.dialogs.confirm('Confirm Removal',"Are you sure?",["Yeah","May Be!","No Way!"]);
        			dlg.result.then(function(btn){
        				subEntity.deleted = true;
        				app.alert.success(field.label+" Removed!");
        			},function(btn){
        				
        			});			
        		}
        		//END-SUB-ENTITY-MANAGEMENT            	
            },
            templateUrl: '/profiles/entitymgmt.app/directives/templates/entity.editor.otm.html',
            link: function (scope, element, attrs) {
            	var editor = element.find('#editor');
                if(editor!=null){
                	editor.append("<div entitymgmt-entity-editor action=\"Add\" show-delete=\"false\" app=\"app\" container-entity=\"entity['"+scope.field.name+"']\" entity=\"entity['"+"_new_"+scope.field.name+"']\" meta=\"field.meta\"  on-save=\"addSubEntity()\" on-reset=\"resetEntity()\" on-delete=\"deleteEntity()\"></div>");
                	$compile(element.contents())(scope);
                }
            }
        };
    };

}());