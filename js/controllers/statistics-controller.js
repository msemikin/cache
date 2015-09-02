'use strict';
var app = angular.module('cache');
app.controller('StatisticsCtrl', ['$scope', 'Statistic', 'Object', 'Utils', function($scope, Statistic, Object, Utils) {
    $scope.objects = [];
    $scope.statistics = [];
    $scope.statistic = null;
    $scope.statisticName = null;
    $scope.availableAttrs = {};

    function updateObjects() {
        return Object.load().then(function(data) {
            $scope.objects = data;
        });
    }

    function fillAvailableAttrs(statistic) {
        var statisticObjects = statistic.objects;
        _.each(statisticObjects, function(statisticObject) {
            var originalObject = _.findWhere($scope.objects, {
                id: statisticObject.id
            });
            $scope.availableAttrs[originalObject.id] = Utils.difference(originalObject.attrs, statisticObject.attrs);
        });
    }

    function fillAvailableObjects(statistic) {
        $scope.availableObjects = Utils.difference($scope.objects, statistic.objects);
        return statistic;
    }

    function selectStatistic(statistic) {
        // statistic is an id
        $scope.statistic = statistic;
        if (statistic) {
            fillAvailableObjects(statistic);
            fillAvailableAttrs(statistic);
        }
        return statistic;
    }

    function updateStatistics(statisticId) {
        return Statistic.load()
            .then(function(statistics) {
                var statistic = typeof statisticId === 'number' ? _.findWhere(statistics, {
                    id: statisticId
                }) : statistics[0];
                $scope.statistics = statistics;
                selectStatistic(statistic);
                return statistic;
            });
    }


    $scope.selectStatistic = selectStatistic;

    $scope.addStatistic = function() {
        var statistic = {
            name: $scope.statisticName,
            objects: []
        };
        Statistic.create(statistic)
            .then(function(response) {
                $scope.statisticName = '';
                return updateStatistics(response.id);
            });
    };

    $scope.addObject = function(object) {
        var statistic = $scope.statistic;
        var statisticObject = $.extend({}, object, {attrs: []});
        statistic.objects.push(statisticObject);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.addAttr = function(object, attr) {
        var statistic = $scope.statistic;
        var objectIndex = _.findIndex(statistic.objects, {
            id: object.id
        });
        statistic.objects[objectIndex].attrs.push(attr);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.removeAttr = function(object, attr) {
        var statistic = $scope.statistic;
        var objectIndex = _.findIndex(statistic.objects, {
            id: object.id
        });
        var attrIndex = _.findIndex(statistic.objects[objectIndex].attrs, {
            id: attr.id
        });
        statistic.objects[objectIndex].attrs.splice(attrIndex, 1);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.removeObject = function(object) {
        var statistic = $scope.statistic;
        var objectIndex = _.findIndex(statistic.objects, {
            id: object.id
        });
        statistic.objects.splice(objectIndex, 1);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.initDropdowns = function () {
        $(document).ready(function() {
            $('.dropdown-toggle').dropdown();
        });
    };

    $scope.onKeypress = function (event) {
        if(event.keyCode === 13) {
            $scope.addStatistic();
        }
    };

    updateObjects().then(updateStatistics);
}]);
