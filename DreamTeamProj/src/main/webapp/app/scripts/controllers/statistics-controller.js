'use strict';
var app = angular.module('db');
app.controller('StatisticsCtrl', ['$scope', 'Statistic', 'Object', 'Utils', function($scope, Statistic, Object, Utils) {
    $scope.entities = [];
    $scope.statistics = [];
    $scope.statistic = null;
    $scope.statisticName = null;
    $scope.availableAttrs = {};

    function updateObjects() {
        return Object.load().then(function(data) {
            $scope.entities = data;
        });
    }

    function fillAvailableAttrs(statistic) {
        var statisticObjects = statistic.entities;
        _.each(statisticObjects, function(statisticObject) {
            var originalObject = _.findWhere($scope.entities, {
                id: statisticObject.id
            });
            if (originalObject) {
                $scope.availableAttrs[originalObject.id] = Utils.difference(originalObject.attrs, statisticObject.attrs);
            }
        });
    }

    function fillAvailableObjects(statistic) {
        $scope.availableObjects = Utils.difference($scope.entities, statistic.entities);
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
            entities: []
        };
        Statistic.create(statistic)
            .then(function(response) {
                $scope.statisticName = '';
                return updateStatistics(response.id);
            });
    };

    $scope.addObject = function(entity) {
        var statistic = $scope.statistic;
        statistic.entities.push(entity);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.addAttr = function(entity, attr) {
        var statistic = $scope.statistic;
        var entityIndex = _.findIndex(statistic.entities, {
            id: entity.id
        });
        statistic.entities[entityIndex].attrs.push(attr);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.removeAttr = function(entity, attr) {
        var statistic = $scope.statistic;
        var entityIndex = _.findIndex(statistic.entities, {
            id: entity.id
        });
        var attrIndex = _.findIndex(statistic.entities[entityIndex].attrs, {
            id: attr.id
        });
        statistic.entities[entityIndex].attrs.splice(attrIndex, 1);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.removeObject = function(entity) {
        var statistic = $scope.statistic;
        var entityIndex = _.findIndex(statistic.entities, {
            id: entity.id
        });
        statistic.entities.splice(entityIndex, 1);
        Statistic.update(statistic).then(function(response) {
            updateStatistics(statistic.id);
        });
    };

    $scope.initDropdowns = function () {
        // $(document).ready(function() {
        //     $('.dropdown-toggle').dropdown();
        // });
    };

    $scope.onKeypress = function (event) {
        if(event.keyCode === 13) {
            $scope.addStatistic();
        }
    };

    updateObjects().then(updateStatistics);
}]);
