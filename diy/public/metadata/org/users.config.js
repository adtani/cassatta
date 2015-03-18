(function() {

    'use strict';
    
    define(function () {
        return {
        	
			editor: {
				entityType: "org.users",
				tabs : [
					{
						name: "Tab 1",
						label: "General",
						fields: [
				            { 
				            	name: "id", 
				            	label:"ID",
				            	type:"id"
				            },
				            { 
				            	name: "login", 
				            	label: "Login",
				            	searchable: true,
				            	type:"text"
				            },
				            { 
				            	name: "name", 
				            	label: "Name",
				            	searchable: true,
				            	type:"text"
				            },
				            { 
				            	name: "password", 
				            	label: "Password",
				            	searchable: true,
				            	type:"password"
				            },
				            { 
				            	name: "isAdmin", 
				            	label: "Is Admin",
				            	searchable: false,
				            	type:"boolean"
				            },
				            { 
				            	name: "access", 
				            	label: "Access Level",
				            	type:"int" 
				            }
						 ]
					},
					{
						name: "Tab 2",
						label: "Privileges",
						fields: [
					        {
					        	name:"roles",
					        	label:"Role",
					            type:"OTM",
					            domainType:"org.roles",
					            reverseReference: "user",
						    	required:false
					        }
						]
					}
					
				]	 
			},
				
			listView : {
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
			},
			
        	actions : [
                 
            ]
        };
    });

})();







