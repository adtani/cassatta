(function () {
    'use strict';

    angular.module('angularApp')
        .constant('AppConfig', {
        	
    		//REST SERVER BASE URL - Single place configuration
    		DOC_SERVER_URL: '/rest',
    		SQL_SERVER_URL: '/rest',
    		UPLOAD_SERVER_URL: '/upload',

    		apptitle : "Entity Management App V1.0",
    		
    		modules : [
    				{
    					path : "profiles/taskmgmtv2.app",
    					name : "taskmgmtv2",
    					icon : "/profiles/taskmgmtv2.app/images/tasksv2.png",
    					title : "Tasks Management v2.0",
    					description : "Tasks Management!",
    					level : 0
    				}    				
    		]
    	}
    );   
    
})();

