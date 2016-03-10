'use strict';
angular.module('db').controller('EntitiesAttrsCtrl', function ($scope, $rootScope, Restangular) {
    var baseEntities = $scope.baseProject.all('entities');

    $scope.entities = [];
    $scope.entity = null;
    $scope.entityName = '';
    $scope.attrName = '';

    function updateEntities() {
        baseEntities.getList().then(entities => {
            $scope.entities = entities;
        });
    }

    $scope.addEntity = function () {
        var entity = {
            name: $scope.entityName,
            projectId: $scope.baseProject.id
        };
        $scope.entityName = '';
        baseEntities.post(entity).then(function (entity) {
            $scope.entities.push(entity);
            $scope.entity = entity;
        });
    };
    $scope.addAttr = function () {
        var attr = {
            name: $scope.attrName
        };
        $scope.entity.attrs.push(attr);
        $scope.attrName = '';
        $scope.entity.put().then(selectUpdated);
    };
    $scope.onKeypress = function(event, callback) {
        if (event.keyCode === 13) {
            callback();
        }
    };
    $scope.deselectEntity = function () {
        $scope.entity = null;
    };

    $scope.removeEntity = function (ent) {
        ent.remove().then(updateEntities);
    };
    $scope.removeAttr = function (attr) {
        $scope.entity.attrs = _.without($scope.entity.attrs, attr);
        $scope.entity.put().then(selectUpdated);
    };

    $scope.selectEntity = function (entity) {
        $scope.entity = entity;
    };

    function selectUpdated(entity) {
        var index = _.findIndex($scope.entities, {id: entity.id})
        $scope.entities[index] = entity;
        $scope.entity = entity;
    }

    updateEntities();
});
