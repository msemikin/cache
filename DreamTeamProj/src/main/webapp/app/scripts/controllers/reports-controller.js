'use strict';
var app = angular.module('db');
app.controller('ReportsCtrl', ['$scope', 'Report', 'CommonCtrlFactory', function ($scope, Report, CommonCtrlFactory) {
    CommonCtrlFactory({
        entityName: 'report',
        listName: 'reports',
        $scope: $scope,
        dataProvider: Report
    });
}]);
