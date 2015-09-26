'use strict';
angular.module('db').controller("DashboardCtrl", function ($scope, $location, $rootScope, $window) {
    $scope.user = {
        FullName: "Анатолий Иваныч"
    };
    $rootScope.hideAttrs = function () {
        $rootScope.showAttributes = false;
    };
    $rootScope.showAttrs = function () {
        $rootScope.showAttributes = true;
    };
    $scope.goURL = function(destinationUrl) {
        $window.location.href = destinationUrl;
    };
    $scope.tab = 1;
    $scope.logout = function() {
        //TODO
        $scope.goURL('login/index.html');
    }
});
