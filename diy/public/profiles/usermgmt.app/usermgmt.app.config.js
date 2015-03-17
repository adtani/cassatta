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
    					path : "profiles/usermgmt.app",
    					name : "usermgmt",
    					icon : "/profiles/usermgmt.app/images/users.png",
    					title : "Documents",
    					description : "User Management!",
    					level : 0
    				}    				
    		]
    	}
    );   
    
})();

