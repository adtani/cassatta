(function() {
    'use strict';
    
    define(function () {
        return {
        	
			label:"Comment",
			"editor" : {
				name: "Tab 1.2",
				label: "General",
		        entityType:"org.taskmgmt.taskcomments",
				tabs : [
					{
						name: "Tab 1.2.1",
						label: "Comments",
		    			"fields" : [
		    				{
					        	name:"task",
							    display: false,
					        	label: "Task",
					            type:"OTO",
					            "domainType":"org.taskmgmt.tasks",
						    	required:true
		    				},
						    {
							    name:"id",
							    display: false,
							    type:"id",
							    label: "ID", 
							    required:true 
						    },			    			
					        {
					        	name:"owner",
							    display: false,
					        	label: "Owner",
					            type:"owner",
					            "domainType":"org.users",
						    	required:true
					        },
					        {
					        	name:"assignee",
					        	label: "Assignee",
					            type:"OTO",
					            "domainType":"org.users",
						    	required:true
					        },
						    {
							    name:"title",
							    label:"Title",
							    type:"text",
							    required:true,
							    searchable:true
						    },
						    {
							    name:"text",
							    label:"Text",
							    type:"textarea",
							    required:true,
							    searchable:true
						    },
						    {
							    name:"status",
							    label:"Status",
							    type:"text",
							    required:true,
							    searchable:true
						    },											    
						    {
							    name:"entityType",
							    type:"entityType",
							    required:true,
							    display:false
						    }	    			
		    			]
					}					
				]
			},
			
			listView : {
				entityType: "org.taskmgmt.taskcommentsview",
				fields: [
				
				            { 
				            	name: "ownerName", 
				            	displayName: "Created by", 
				            	enableCellEdit: false,
				            	allowCellFocus: false
				            },
			   	    	    { 	name: "taskId", 
			   	    	    	displayName: "Task ID", 
			   	    	    	enableCellEdit: false, 
			   	    	    	allowCellFocus: false
			   	    	    },
				            { 
				            	name: "id", 
				            	displayName:"Comment ID", 
				            	enableCellEdit: false,
				            	allowCellFocus: false
				            },
				            { 
				            	name: "title", 
				            	displayName: "Comment Title", 
				            	enableCellEdit: true, 
				            	allowCellFocus: false
				            },
				            { 
				            	name: "status", 
				            	displayName: "Status", 
				            	enableCellEdit: true, 
				            	allowCellFocus: false
				            },
				            { 
				            	name: "assigneeName", 
				            	displayName: "Assigned To", 
				            	enableCellEdit: true, 
				            	allowCellFocus: false
				            }
				   	    ]
				},	

        	actions : [
                 
            ]
        };
    });

})();


