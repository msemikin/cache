'use strict';
angular.module('db').controller('DashboardCtrl', function ($scope) {
    $scope.projects = [];
    for (var i = 0; i < 10; i++) {
        $scope.projects.push({
            name: 'Test project 1',
            edited: new Date(),
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
        });
    }
});