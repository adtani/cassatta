(function () {
    'use strict';

    var app = angular.module('angularApp');
    
    app.config(['$routeProvider', 'dialogsProvider', 'AppConfig', routingConfig]);

    function routingConfig($routeProvider, dialogsProvider, AppConfig) {
    	
        //routing configuration
        $routeProvider
        .when('/login', {
          templateUrl: '/system.modules/login/login.html'
        })
        .when('/welcome/:module?/:action?/:arg1?/:arg2?/:arg3?/:arg4?', {
          templateUrl: '/system.modules/welcome/welcome.html'
        })
        .otherwise({
          redirectTo: '/welcome'
        });

    };
    
})();
