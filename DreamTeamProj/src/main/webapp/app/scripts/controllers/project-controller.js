'use strict';
angular.module('db').controller("ProjectCtrl", function ($scope, $location, $rootScope, $window, project) {
    $scope.activePanels = {
        objects: true
    };

    $scope.baseProject = project;

    $scope.shrunk = false;
    $rootScope.hideAttrs = function () {
        $rootScope.showAttributes = false;
    };
    $rootScope.showAttrs = function () {
        $rootScope.showAttributes = true;
    };
    $rootScope.$on('shrink-menu', function () {
        $scope.shrunk = !$scope.shrunk;
    });

    $scope.toggleShowPanel = function (name) {
        $scope.activePanels[name] = !$scope.activePanels[name];
    };
});
