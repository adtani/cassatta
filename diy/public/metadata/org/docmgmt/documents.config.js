(function() {
    'use strict';
    
    define(function () {
        return {
        	label:"Document",
			editor: {
				entityType: "org.docmgmt.documents",
				tabs : [
					{
						name: "default",
						label: "General",
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
		            	name: "title", 
		            	label: "Title",
		            	searchable: true,
		            	requried:true,
		            	type:"text",
					    placement:"default"
		            },
		            { 
		            	name: "description", 
		            	label: "Description",
		            	required: true,
		            	type:"textarea",
					    placement:"default"
		            },
		            { 
		            	name: "status", 
		            	label: "Status",
		            	requried:true,
		            	type:"text",
					    placement:"default",
		            	validvalues:[
		            		"DRAFT",
		            		"SUBMITTED",
		            		"PENDING_REVIEW",
		            		"REVIEWED",
		            		"APPROVED"
		            	]
		            },
		            { 
		            	name: "file", 
		            	label: "File Attachment",
		            	type:"file",
					    placement:"default"
		            },
			        {
			        	name:"owner",
			        	label: "Owner",
			            type:"owner",
			            domainType:"org.users",
				    	required:true,
				    	display:false,
					    placement:"default"
			        },
			        {
			        	name:"assignee",
			        	label: "Assigned To",
			            type:"OTO",
			            domainType:"org.users",
				    	required:false,
					    placement:"default"
			        },
			        {
			        	name:"attributes",
			        	label:"Attributes",
			            type:"OTM",
			            embedded:true,
			            domainType:"org.docmgmt.attributes",
			            reverseReference: "document",
				    	required:false,
					    placement:"default"
			        }
				 ]				
			},
			
			listViews : [
			    {
					name: "default",
					entityType: "org.docmgmt.documents",
					fields: [
			    	    { 	name: "id", 
			    	    	displayName: "ID", 
			    	    	enableCellEdit: false, 
			    	    	allowCellFocus: false
			    	    },
			            { 
			            	name: "title", 
			            	displayName:"Title", 
			            	enableCellEdit: true,
			            	allowCellFocus: true
			            },
			            { 
			            	name: "status", 
			            	displayName:"Status", 
			            	enableCellEdit: true,
			            	allowCellFocus: true
			            },
			            { 
			            	name: "assignee", 
			            	displayName:"Assignee", 
			            	enableCellEdit: true,
			            	allowCellFocus: true
			            }
					]
				}
			],
		
			actions:[
			
			]		            
        };
    });

})();






