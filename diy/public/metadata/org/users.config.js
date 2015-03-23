(function() {

    'use strict';
    
    define(function () {
        return {
        	
			editor: {
				entityType: "org.users",
				tabs : [
					{
						name: "default",
						label: "General"
					},
					{
						name: "roles",
						label: "Privileges",
					}					
				],
				
				fields: [
		            { 
		            	name: "id", 
		            	label:"ID",
		            	type:"id",
		            	placement:"default"
		            },
		            { 
		            	name: "login", 
		            	label: "Login",
		            	searchable: true,
		            	type:"text",
		            	placement:"default"
		            },
		            { 
		            	name: "name", 
		            	label: "Name",
		            	searchable: true,
		            	type:"text",
		            	placement:"default"
		            },
		            { 
		            	name: "password", 
		            	label: "Password",
		            	searchable: true,
		            	type:"password",
		            	placement:"default"
		            },
		            { 
		            	name: "isAdmin", 
		            	label: "Is Admin",
		            	searchable: false,
		            	type:"boolean",
		            	placement:"default"
		            },
		            { 
		            	name: "access", 
		            	label: "Access Level",
		            	type:"int",
		            	placement:"default"
		            },
			        {
			        	name:"roles",
			        	label:"Role",
			            type:"OTM",
			            domainType:"org.roles",
			            reverseReference: "user",
				    	required:false,
				    	placement:"roles"
			        }
				 ]
			},
				
			listViews : [
			    {
			    	name: "default",
			    	entityType: "org.users",
			    	fields: [
			            { 
			            	name: "id", 
			            	displayName:"ID", 
			            	enableCellEdit: false,
			            	allowCellFocus: false
			            },
			            { 
			            	name: "login", 
			            	displayName: "Login", 
			            	enableCellEdit: true, 
			            	cellClass: "NEW",
			            	searchable: true
			            },
			            { 
			            	name: "name", 
			            	displayName: "Name", 
			            	enableCellEdit: true, 
			            	allowCellFocus: false,
			            	cellClass: "NEW",
			            	searchable: true
			            },
			            { 
			            	name: "isAdmin", 
			            	displayName: "IsAdmin" 
			            },
			            { 
			            	name: "access", 
			            	displayName: "Access Level" 
			            }
			   	    ]
			    }
			],
			
        	actions : [
                 
            ]
        };
    });

})();







