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
    					path : "profiles/entitymgmt.app",
    					name : "entitymgmt",
    					icon : "/profiles/entitymgmt.app/images/people.png",
    					title : "Entities",
    					description : "Entity Management!",
    					level : 0,
    					actions : [
    					    {
    					    	name : "addtask",
    					    	title : "Add Entity",
    					    	level : 0
    					    }	
    					]
    				}    				
    		]
    	}
    );   
    
})();

