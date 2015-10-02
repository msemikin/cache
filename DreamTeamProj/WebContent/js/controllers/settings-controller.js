'use strict';
angular.module('db').controller("SettingsCtrl", function ($scope, $location, $rootScope, $window) {
    $scope.user = {
        FullName: "Анатолий Иваныч"
    };
    $scope.goURL = function(destinationUrl) {
        $window.location.href = destinationUrl;
    };
    $scope.tab = 1;
    $scope.changeTab = function(tabVal){
        $scope.tab = tabVal;
    }
});
