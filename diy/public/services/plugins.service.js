(function() {
    'use strict';

    angular.module('angularApp')
        .factory('pluginsService', [pluginsService]);
   
    function pluginsService() {
    	
    	var plugins = [];
    	
        return {
        	registerPlugins:registerPlugins,
        	registerPlugin:registerPlugin,
        	getPluginByIntent:getPluginByIntent,
        	getAvailableIntents:getAvailableIntents
        };

    	function registerPlugins(domainType, plugins){
    		angular.forEach(plugins, function(plugin){
    			registerPlugin(domainType, plugin);
    		});
    	}
    	
    	function registerPlugin(domainType, plugin){
    		plugins[domainType].push(plugin);
    	}
    	
    	function getPluginByIntent(domainType, intent){
    		var matchingPlugins = $.grep(plugins[domainType], function(plugin){
    			return plugin.intent == intent;
    		});
    		if(matchingPlugins.length>0){
    			return matchingPlugins[0];
    		}
    	}
    	
    	function getAvailableIntents(domainType){
    		return $.all(plugins[domainType], function(plugin){
    			return plugin.intent;
    		})
    	}
    }

})();
