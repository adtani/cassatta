(function() {
    'use strict';
    
    define(function () {
        return {
        	
				label:"File",
				editor: {
					entityType: "org.taskmgmt.taskfiles",
					tabs : [
						{
							name: "default",
							label: "Task Files"
						}			
					],
					fields : [
					    {
						    name:"id",
						    type:"id",
						    label:"ID",
						    required:true,
					    	placement:"default" 
					    },
					    {
						    name:"entityType",
						    type:"entityType",
						    required:true,
					    	placement:"default"
					    },
				        {
				        	name:"owner",
				        	label: "Owner",
				            type:"owner",
				            "domainType":"org.users",
					    	required:true,
					    	placement:"default"
				        },
				        {
				        	name:"task",
				        	label: "Task",
				            type:"OTO",
				            "display":false,
				            "domainType":"org.taskmgmt.tasks",
					    	required:true,
					    	placement:"default"
				        },
					    {
						    name:"name",
						    label:"Name",
						    type:"text",
						    required:true,
						    searchable:true,
					    	placement:"default"
					    },
					    {
						    name:"path",
						    label:"Path",
						    type:"file",
						    required:true,
						    searchable:true,
					    	placement:"default"
					    }
					]					
				},
			
				listViews : [ 
					{
					name: "default",
					entityType: "org.taskmgmt.taskfilesview",
					fields: [
			   	    	    { 	name: "taskId", 
			   	    	    	displayName: "Task ID", 
			   	    	    	enableCellEdit: false, 
			   	    	    	allowCellFocus: false
			   	    	    },
				            { 
				            	name: "id", 
				            	displayName:"File ID", 
				            	enableCellEdit: false,
				            	allowCellFocus: false
				            },
				            { 
				            	name: "taskTitle", 
				            	displayName: "Task Title" 
				            },
				            { 
				            	name: "name", 
				            	displayName: "Name", 
				            	enableCellEdit: true, 
				            	allowCellFocus: false
				            },
				            { 
				            	name: "path", 
				            	displayName: "Path", 
				            	enableCellEdit: true, 
				            	allowCellFocus: false
				            },
				            { 
				            	name: "ownerName", 
				            	displayName: "Uploaded by", 
				            	enableCellEdit: false,
				            	allowCellFocus: false
				            }
				   	    ]
					}
				],
						
	        	actions : [
	                 
	            ]
        };
    });

})();





