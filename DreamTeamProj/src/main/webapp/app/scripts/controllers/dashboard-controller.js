'use strict';
angular.module('db').controller("DashboardCtrl", function ($scope, $location, $rootScope, $window) {
    $scope.shrunk = false;
    $scope.user = {
        FullName: "Анатолий Иваныч"
    };
    $rootScope.hideAttrs = function () {
        $rootScope.showAttributes = false;
    };
    $rootScope.showAttrs = function () {
        $rootScope.showAttributes = true;
    };
    $rootScope.$on('shrink-menu', function () {
        $scope.shrunk = !$scope.shrunk;
    });
    $scope.goURL = function(destinationUrl) {
        $window.location.href = destinationUrl;
    };
    $scope.tab = 1;
    $scope.logout = function () {
        //TODO session logout
        $scope.goURL('login.html');
    }
});
