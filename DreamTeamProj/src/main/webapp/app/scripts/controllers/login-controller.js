'use strict';
angular.module('db').controller('LoginCtrl', function($scope, AuthService, $state) {
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
                $scope.loggingIn = false;
            })
            .then(function() {
                $state.go('dashboard');
            });
    };
});