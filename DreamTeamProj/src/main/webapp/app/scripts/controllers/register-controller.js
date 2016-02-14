'use strict';
angular.module('db').controller('RegisterCtrl', function($scope, http, AuthService, $state, $timeout, ErrorModal) {

    $scope.data = {
        fullname: '',
        email: '',
        password: ''
    };
    $scope.registering = false;

    function showError(error) {
        if(error && error.status === 401) {
            ErrorModal.showError('Wrong credentials!');
            return;
        }
        ErrorModal.showError(error.data.message || 'Unknown error!');
    }

    $scope.register = function() {
        $scope.registering = true;
        http.post('account/student/register', $scope.data)
            .then(function() {
                return AuthService.login($scope.data.email, $scope.data.password);
            })
            .then(function() {
                $timeout(function() {
                    $state.go('dashboard');
                });
            })
            .catch(showError)
            .finally(function() {
                $scope.registering = false;
            });
    };

    $scope.hasErrors = function(field) {
        var field = $scope.registerForm[field];
        return field.$touched && !field.$valid;
    };

});