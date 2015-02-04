(function () {
    'use strict';

    angular.module('angularApp')
        .constant('AppConfig', {
        	
    		//REST SERVER BASE URL - Single place configuration
        	DOC_SERVER_URL: 'http://localhost:9090/rest',

    		apptitle : "Administration Console V1.0",
    		
    		modules : [
    				{
    					path : "demo.modules",
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
    					path : "demo.modules",
    					name : "dialogs",
    					title : "Example Dialogs",
    					description : "Dialog Examples!",
    					level : 0
    				}
    		]
    	}
    );   
    
})();

