(function () {
    'use strict';

    angular.module('angularApp')
        .directive('myDirective', [myDirective]);

    function myDirective() {
    	 return {
    	 	restrict: 'E',
    	 	scope : {
    	 		items : '=',
    	 		onRowSelect : '&'
    	 	},
		    templateUrl: '/result-image-template.html'
		 };
    };
})();