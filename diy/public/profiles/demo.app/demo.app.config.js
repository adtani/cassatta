(function () {
    'use strict';

    angular.module('angularApp')
        .constant('AppConfig', {
        	
    		//REST SERVER BASE URL - Single place configuration
    		DOC_SERVER_URL: 'http://localhost:8080/rest',

    		apptitle : "My Angular App V1.0 - Beta (Default Profile)",
    		
    		modules : [
    				{
    					path : "profiles/demo.app",
    					name : "hello",
    					title : "Hello World",
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
    				}    				
    		]
    	}
    );   
    
})();

