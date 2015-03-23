(function() {
    'use strict';
    
    define(function () {
        return {
				editor: {
					entityType: "org.roles",
					tabs: [
						{
							name: "default",
							label: "General"
						}
					],
					
					fields: [
			            { 
			            	name: "id", 
			            	label:"ID",
			            	type:"id",
			            	display:false,
			            	placement:"default"
			            },
			            { 
			            	name: "roleName", 
			            	label: "Role",
			            	searchable: true,
			            	type:"select",
			            	validvalues:[
			            		"ROOT","ADMIN","LEVEL1","LEVEL2","LEVEL3","LEVEL4","LEVEL5","CUSTOM1" 
			            	],
			            	placement:"default"
			            },
						{
				        	name:"user",
				        	label: "User",
				            type:"OTO",
				            display:false,
				            "domainType":"org.users",
					    	"required":true,
			            	placement:"default"
			        	}
					 ]
				},
				
		    	actions : [
		             
		        ]
        };
    });

})();





