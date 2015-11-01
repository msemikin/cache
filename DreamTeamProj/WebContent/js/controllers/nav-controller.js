'use strict';
angular.module('db').controller("NavCtrl", function($scope, Modals, $rootScope) {
    $scope.generateDoc = function () {
        Modals.open('generate-doc');
    };
    $scope.shrinkMenu = function () {
        $rootScope.$emit('shrink-menu');
    };
});
