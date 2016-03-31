'use strict';
angular.module('db').controller("ProjectCtrl", function ($scope, $location, $rootScope, $window, project) {
    $scope.activePanels = {
        objects: true
    };

    $rootScope.baseProject = _.extend(project, {
        documents: [{
            id: 1,
            name: 'Solution 1'
        }]
    });

    $scope.shrunk = false;
    $rootScope.$on('shrink-menu', function () {
        $scope.shrunk = !$scope.shrunk;
    });

    $scope.toggleShowPanel = function (name) {
        $scope.activePanels[name] = !$scope.activePanels[name];
    };
});
