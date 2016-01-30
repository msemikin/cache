angular.module('db').controller('RegisterCtrl', function($scope, http) {

    $scope.data = {
        fullname: '',
        email: '',
        password: ''
    };
    $scope.registering = false;

    $scope.submitRegister = function() {
        $scope.registering = true;
        http.post('account/student/register', $scope.data)
            .then(function() {
                console.log('registered', arguments);
                $scope.registering = false;
            });
    };

    $scope.hasErrors = function(field) {
        var field = $scope.registerForm[field];
        console.log(field);
        return field.$touched && !field.$valid;
    };

});