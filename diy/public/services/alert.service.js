(function() {
    'use strict';

    angular.module('angularApp')
        .factory('alertService', ['$rootScope', 'toaster', alertService]);
   
    function alertService($rootScope, toaster) {
    	
        return {
        	success:success,
        	warning:warning,
        	error:error,
        	note:note
        };

    	function success(title, message){
    		toaster.pop('success', title, message);
    	}
    	
    	function warning(title, message){
    		toaster.pop('warning', title, message);
    	}
    	function error(title, message){
    		toaster.pop('error', title, message);
    	}
    	function note(title, message){
    		toaster.pop('note', title, message);
    	}
    	

    }

})();
