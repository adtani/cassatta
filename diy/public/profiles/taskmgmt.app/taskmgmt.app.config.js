(function () {
    'use strict';

    angular.module('angularApp')
        .constant('AppConfig', {
        	
    		//REST SERVER BASE URL - Single place configuration
    		DOC_SERVER_URL: '/rest',
    		SQL_SERVER_URL: '/rest',
    		UPLOAD_SERVER_URL: '/upload',

    		apptitle : "Task Management App V1.0",
    		
    		modules : [
    				{
    					path : "profiles/taskmgmt.app",
    					name : "taskmgmt",
    					title : "Tasks",
    					description : "Task Management!",
    					level : 0,
    					actions : [
    					    {
    					    	name : "addtask",
    					    	title : "Add Task",
    					    	level : 0
    					    }	
    					]
    				}    				
    		]
    	}
    );   
    
})();

