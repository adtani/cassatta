(function() {
    'use strict';
    
    define(function () {
        return {
        	
				label:"File",
				editor: {
					entityType: "org.taskmgmt.taskfiles",
					tabs : [
						{
							name: "Tab 1",
							label: "General",
							fields : [
								    {
									    name:"id",
									    type:"id",
									    label:"ID",
									    required:true 
								    },
								    {
									    name:"entityType",
									    type:"entityType",
									    required:true
								    },
							        {
							        	name:"owner",
							        	label: "Owner",
							            type:"owner",
							            "domainType":"org.users",
								    	required:true
							        },
							        {
							        	name:"task",
							        	label: "Task",
							            type:"OTO",
							            "display":false,
							            "domainType":"org.taskmgmt.tasks",
								    	required:true
							        },
								    {
									    name:"name",
									    label:"Name",
									    type:"text",
									    required:true,
									    searchable:true
								    },
								    {
									    name:"path",
									    label:"Path",
									    type:"file",
									    required:true,
									    searchable:true
								    }
								]
							}			
						]
					},
			
				listView : {
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
					},
						
	        	actions : [
	                 
	            ]
        };
    });

})();





