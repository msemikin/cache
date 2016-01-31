'use strict';
angular.module('db').service('AuthService', function($http, Config) {
    return {
        authenticate: function() {
            return $http.get(Config.API_PATH + 'account').then(function(response) {
                return response.data;
            });
        },
        login: function(email, password) {
            var postData = 'email=' + email + '&password=' + password;
            return $http({
                method: 'POST',
                url: Config.API_PATH + 'login',
                data: postData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        },
        logout: function() {

        }
    }
});