'use strict';
angular.module('db').controller("SettingsCtrl", function ($scope, $location, $rootScope, $window) {
    $scope.tab = 1;
    $scope.user = {
        FullName: "Анатолий Иваныч"
    };
    $scope.goURL = function (destinationUrl) {
        $window.location.href = destinationUrl;
    };
    $scope.changeTab = function (tabVal) {
        $scope.tab = tabVal;
    }
    $scope.$on('$locationChangeSuccess',
        function () {
            if ($location.hash() == "projects") $scope.changeTab(2);
        });
});
