(function() {
    'use strict';

    angular.module('angularApp')
        .factory('usersService', ['$resource', '$rootScope', '$scope', 'AppConfig', usersService]);

    function usersService($resource, $rootScope, $scope, AppConfig) {
        return {
            getUsers : getUsers,
            getUserByLogin : getUserByLogin
        };

        function getUsers() {
            return $resource(AppConfig.URL_GET_USERS).get().$promise;
        };
        
        function getUserByLogin(login) {
            return $resource(AppConfig.URL_GET_USER_BY_FILTER, { login: login }).get().$promise;
        };
    }

})();
