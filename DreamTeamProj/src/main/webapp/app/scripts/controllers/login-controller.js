'use strict';
angular.module('db').controller('LoginCtrl', function($scope, AuthService, $state, $timeout) {
    $scope.data = {
        email: '',
        password: ''
    };

    $scope.hasErrors = function(field) {
        var field = $scope.loginForm[field];
        return field.$touched && !field.$valid;
    };

    $scope.loggingIn = false;

    $scope.login = function() {
        $scope.loggingIn = true;
        return AuthService.login($scope.data.email, $scope.data.password)
            .then(function() {
                $timeout(function() {
                    $scope.loggingIn = false;
                    $state.go('dashboard');
                });
            });
    };
});