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
        .when('/welcome', {
          templateUrl: '/system.modules/welcome/welcome.html'
        })
        .when('/welcome/:module', {
          templateUrl: '/system.modules/welcome/welcome.html'
        })
        .when('/welcome/:module/:action', {
          templateUrl: '/system.modules/welcome/welcome.html'
        })
        .otherwise({
          redirectTo: '/welcome'
        });

    };
    
})();
