(function() {
    'use strict';
    
    define(function () {
        return {
        	label:"Attribute",
			"editor": {
				"entityType": "org.docmgmt.attributes",
				"tabs" : [
					{
						name: "Tab 1",
						label: "General",
						"fields": [
				            { 
				            	name: "name", 
				            	label: "Attribute Name",
				            	searchable: true,
				            	type:"text"
				            },
				            { 
				            	name: "value", 
				            	label: "Attribute Value",
				            	type:"textarea"
				            }
						 ]
					}
				]	 
			},
			
			actions:[
			
			]		            
        };
    });

})();