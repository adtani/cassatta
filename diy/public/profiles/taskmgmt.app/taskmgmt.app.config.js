(function () {
    'use strict';

    angular.module('angularApp')
        .constant('AppConfig', {
        	
    		//REST SERVER BASE URL - Single place configuration
    		DOC_SERVER_URL: 'http://localhost:8080/rest',
    		SQL_SERVER_URL: 'http://localhost:9090/rest',
    		UPLOAD_SERVER_URL: 'http://localhost:9090/upload',

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

