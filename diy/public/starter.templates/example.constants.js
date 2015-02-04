(function () {
    'use strict';

    angular.module('angularApp')
        .constant('AppConfig', {
    		RESPONSE_PAYLOAD_PREFIX: 		'_embedded["rh:doc"]',

    		//REST URLs 
    		URL_GET_USERS: 					'localhost:8080/qdb/users',
    		URL_GET_USER_BY_FILTER: 		'localhost:8080/qdb/users?filter=:filter'
    	}
    );   
    
})();

