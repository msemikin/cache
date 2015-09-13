'use strict';
angular.module('db').controller("DashboardCtrl", function($scope, $location, $rootScope) {
    $scope.user = {
        FullName: "Анатолий Иваныч"
    };
    $scope.included = "/pg/projects.html";
    $scope.setPage = function(value) {
        if (value === "projects") {
            $scope.included = "/pg/projects.html";
        } else if (value === "profile") {
            $scope.included = "/pg/profile.html";
        }
    };
    $scope.init = function() {
        var pId = $location.path().split("/")[3] || "Unknown";
    };
    $rootScope.hideAttrs = function () {
        $rootScope.showAttributes = false;
    };
    $rootScope.showAttrs = function () {
        $rootScope.showAttributes = true;
    };
    $scope.tab = 1;
});
