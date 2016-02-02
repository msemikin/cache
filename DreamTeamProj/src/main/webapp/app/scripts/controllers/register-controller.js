'use strict';
angular.module('db').controller('RegisterCtrl', function($scope, http, AuthService, $state, $timeout) {

    $scope.data = {
        fullname: '',
        email: '',
        password: ''
    };
    $scope.registering = false;

    $scope.register = function() {
        $scope.registering = true;
        http.post('account/student/register', $scope.data)
            .then(function() {
                $scope.registering = false;
                return AuthService.login($scope.data.email, $scope.data.password);
            })
            .then(function() {
                $timeout(function() {
                    $state.go('dashboard');
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    $scope.hasErrors = function(field) {
        var field = $scope.registerForm[field];
        return field.$touched && !field.$valid;
    };

});