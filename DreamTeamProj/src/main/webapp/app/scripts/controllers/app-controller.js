'use strict';
angular.module('db').controller('AppCtrl', function($rootScope, $scope, $state, AuthService) {
    AuthService.authenticate()
        .then(function(account) {
            $scope.account = account;
            $scope.authenticated = true;
        }).catch(function(err) {
            $state.go('login');
        });
});