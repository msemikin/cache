'use strict';
angular.module('db').controller("NavCtrl", function($scope, Modals) {
    $scope.generateDoc = function () {
        Modals.open('generate-doc');
    };
});
