'use strict';
angular.module('db').controller('HeaderCtrl', function($scope, $rootScope, AuthService) {
    $scope.logout = AuthService.logout;
});