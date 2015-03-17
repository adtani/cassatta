(function () {
    'use strict';

    angular.module('angularApp')
        .constant('AppConfig', {
        	
    		//REST SERVER BASE URL - Single place configuration
    		DOC_SERVER_URL: '/rest',
    		SQL_SERVER_URL: '/rest',
    		UPLOAD_SERVER_URL: '/upload',

    		apptitle : "My Angular App V1.0 - Beta (Default Profile)",
    		
    		modules : [
    				{
    					path : "profiles/demo.app",
    					name : "hello",
    					title : "Hello World",
    					icon : "/profiles/demo.app/images/hello.png",    					
    					description : "Hello World, just displays Hello World!",
    					level : 0,
    					actions : [
    					    {
    					    	name : "greetme",
    					    	title : "Greet Me",
    					    	level : 100
    					    }, 	
    					    {
    					    	name : "whoami",
    					    	title : "Who am I?",
    					    	level : 100
    					    }, 	
    					    {
    					    	name : "myaccess",
    					    	title : "What is my access level?",
    					    	level : 0
    					    } 	
    					]
    				},
    				{
    					path : "profiles/demo.app",
    					name : "dialogs",
    					icon : "/profiles/demo.app/images/dialogs.png",    					
    					title : "Example Dialogs",
    					description : "Dialog Examples!",
    					level : 0
    				},
    				{
    					path : "profiles/demo.app",
    					name : "doctaskmgmt",
    					title : "Mongo Tasks",
    					description : "Task Management! (Powerd by Mongo)",
    					level : 0,
    					actions : [
    	    					    {
    	    					    	name : "addtask",
    	    					    	title : "Add Task",
    	    					    	level : 0
    	    					    }	
    	    					]
    				},
    				{
    					path : "profiles/taskmgmt.app",
    					name : "taskmgmt",
    					icon : "/profiles/taskmgmt.app/images/tasks.png",    					
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
    				},
    				{
    					path : "profiles/entitymgmt.app",
    					name : "entitymgmt",
    					icon : "/profiles/entitymgmt.app/images/people.png",
    					title : "Entities",
    					description : "Entity Management!",
    					level : 0,
    					actions : [
	    					    {
	    					    	name : "editor",
	    					    	title : "Editor",
	    					    	level : 0
	    					    }	
	    					]
    				},    
    				{
    					path : "profiles/docmgmt.app",
    					name : "docmgmt",
    					icon : "/profiles/docmgmt.app/images/documents.png",
    					title : "Documents Management",
    					description : "Document Management!",
    					level : 100
    				},
    				{
    					path : "profiles/usermgmt.app",
    					name : "usermgmt",
    					icon : "/profiles/usermgmt.app/images/users.png",
    					title : "User Management",
    					description : "User Management!",
    					level : 0
    				},
    				{
    					path : "profiles/taskmgmtv2.app",
    					name : "taskmgmtv2",
    					icon : "/profiles/taskmgmtv2.app/images/tasksv2.png",
    					title : "Tasks Management v2.0",
    					description : "Tasks Management!",
    					level : 100
    				}    				
    		]
    	}
    );   
    
})();

