'use strict';
angular.module('db').service('AuthService', function($http, Config, $rootScope, $q, $state) {

    var authPromise;

    return {
        authenticated: function() {
            if ($rootScope.session && $rootScope.session.authenticated) {
                return $q.when($rootScope.session.account);
            }
            if(authPromise) {
                return authPromise;
            }
            return $q.reject();
        },
        authenticate: function() {
            authPromise = $http.get(Config.API_PATH + 'account').then(function(response) {
                var account = response.data;
                $rootScope.session = {
                    account: account,
                    authenticated: true
                };
                authPromise = null;
                return account;
            });
            return authPromise;
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
            }).then(this.authenticate);
        },
        logout: function() {
            return $http({
                method: 'POST',
                url: Config.API_PATH + 'logout',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function() {
                $rootScope.session = {};
                $state.go('login');
            });
        }
    }
});