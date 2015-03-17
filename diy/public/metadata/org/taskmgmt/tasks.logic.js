(function() {
    'use strict';
    
    define(function () {
        return {
        	
            getActions: function () {
            	
            	 var actions = [
                     {
                  	   name:"markDone",
                  	   label:"Mark Done",
                  	   action:function(plugin, rootScope, scope, app, entities){
                  		   app.alert.success("Plugin launched!","Plugin launched!");
                  	   }
                     }
                  ];        
                return actions;
            }
        
        };
    });

})();

