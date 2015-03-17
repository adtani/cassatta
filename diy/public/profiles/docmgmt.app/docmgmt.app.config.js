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
    					path : "profiles/docmgmt.app",
    					name : "docmgmt",
    					icon : "/profiles/docmgmt.app/images/documents.png",
    					title : "Documents",
    					description : "Document Management!",
    					level : 0
    				}    				
    		]
    	}
    );   
    
})();
