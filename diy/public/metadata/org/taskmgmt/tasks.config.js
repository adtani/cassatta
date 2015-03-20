(function() {
    'use strict';
    
    define(function () {
        return {
        	
    		label:"Task",
    		editor: {
    			entityType: "org.taskmgmt.tasks",
    			tabs : [
    				{
    					name: "Tab 1",
    					label: "General",
    					fields: [
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
    					            domainType:"org.users",
    						    	required:true
    					        },
    					        {
    					        	name:"parent",
    					        	label: "Parent Task",
    					            type:"OTO",
    					            domainType:"org.taskmgmt.tasks",
    						    	required:false
    					        },
    						    {
    							    name:"title",
    							    label:"Title",
    							    type:"text",
    							    required:true,
    							    "searchable":true
    						    },
    					        {
    				        		name:"assignee",
    				        		"label" : "Assignee",
    				            	type:"OTO",
    				            	domainType:"org.users",
    						    	required:true
    					        },			    
    						    {
    							    name:"summary",
    							    label:"Summary",
    							    type:"textarea",
    							    required:true
    							},
    						    {
    							    name:"status",
    							    label:"Status",
    							    type:"text",
    							    required:true,
    							    validvalues:['OPEN','ASSIGNED','CLOSED', 'RE-OPENED']
    						    },
    						    {
    						    	name:"priority",
    						    	label:"Priority",
    						    	type:"int",
    							    required:true,
    							    "validvalues":[
    							    	{"id":1, "value":"High"},
    							    	{"id":2, "value":"Medium"},
    							    	{"id":3, "value":"Low"}
    							    ]
    						    },
    						    {
    						    	name:"dueDate",
    						    	label:"Due Date",
    						    	type:"date",
    							    required:false
    						    },
    						    { 	
    						    	name:"parentage",
    						    	label:"Parentage",
    						    	display: false,
    						    	type:"text",
    							    required:true
    						    }
    						]
    					},
    					{
    						name: "Tab 2",
    						label: "Files",
    						fields: [
    					        {
    					        	name:"files",
    					        	label:"File",
    					            type:"OTM",
    					            domainType:"org.taskmgmt.taskfiles",
    					            reverseReference: "task",
    						    	required:false
    					        }
    						]	
    					},
    					{
    						name: "Tab 3",
    						label: "Comments",
    						fields: [
    					        {
    					        	name:"comments",
    					        	label:"Comments",
    					            type:"OTM",
    					            domainType:"org.taskmgmt.taskcomments",
    					            reverseReference: "task",
    						    	required:false
    					        }
    						]	
    					}											
    				]
    			},
    			
    		listView: {
    			entityType: "org.taskmgmt.tasksview",
    			urlFilter:  "findByAssigneeIdAndStatusNot?assigneeId=:SESSION_USER_ID&status=CLOSED",
    			fields: [
    		   	    	    { 	name: "parentage", 
    		   	    	    	displayName: "Parents", 
    		   	    	    	enableCellEdit: false, 
    		   	    	    	allowCellFocus: false
    		   	    	    },
    			            { 
    			            	name: "id", 
    			            	displayName:"ID", 
    			            	enableCellEdit: false,
    			            	allowCellFocus: false
    			            },
    			            { 
    			            	name: "priority", 
    			            	displayName: "Priority", 
    			            	"cellClass": "NEW"
    			            },
    			            { 
    			            	name: "status", 
    			            	displayName: "Status", 
    			            	enableCellEdit: false, 
    			            	allowCellFocus: false,
    			            	"cellClass": "NEW"
    			            },
    			            { 
    			            	name: "title", 
    			            	displayName: "Title" 
    			            },
    			            { 
    			            	name: "assigneeName", 
    			            	displayName: "Assignee", 
    			            	enableCellEdit: false,
    			            	allowCellFocus: false
    			            },
    			            { 
    			            	name: "dueDate", 
    			            	displayName: "Due Date", 
    			            	type: "date", 
    			            	cellFilter: "date:\"yyyy-MM-dd\"", 
    			            	enableCellEdit: false,
    			            	allowCellFocus: false
    			            }
    			   	    ]
    			},	
	    	
	        	actions : [
	                 {
	              	   name:"markDone",
	              	   label:"Mark Selected Tasks Done",
	              	   execute:function(app, scope, entities){
	              		   if(entities == null || entities.length == 0){
	              			   app.alert.warning("You need to select one or more items first!");
	              		   }else{
              			   	  var deferred = [];
           	   		          angular.forEach(entities, function(entity){
           	   		        	  entity.status = 'DONE';
           	   		        	  deferred.push(app.entities.saveEntity(entity, scope.meta.editor.entityType));
           	   		          });
           	   		          app.q.all(deferred).then(function(responses){
              	   	  			var successCount = $.grep(responses, function(response){
            		  				return response.success;
            		  			}).length;   	  			
            	  				app.alert.success(successCount+" of  "+deferred.length+" Entities Updated!");
           	   		          });
	              		   }
	              	   }
	                 
	                 }
	            ]
        };
    });

})();
