'use strict';
var app = angular.module('cache');
app.controller('ReportsCtrl', ['$scope', 'Report', 'CommonCtrlFactory', function ($scope, Report, CommonCtrlFactory) {
    CommonCtrlFactory({
        elementName: 'report',
        listName: 'reports',
        $scope: $scope,
        dataProvider: Report
    });
}]);
