(function() {
    'use strict';
    
    define(function () {
        return {
        	label:"Attribute",
			"editor": {
				"entityType": "org.docmgmt.attributes",
				"tabs" : [
					{
						name: "default",
						label: "General",
					}
				],	 
				"fields": [
		            { 
		            	name: "name", 
		            	label: "Attribute Name",
		            	searchable: true,
		            	type:"text",
					    placement:"default"
		            },
		            { 
		            	name: "value", 
		            	label: "Attribute Value",
		            	type:"textarea",
					    placement:"default"
		            }
				 ]				
			},
			
			actions:[
			
			]		            
        };
    });

})();
