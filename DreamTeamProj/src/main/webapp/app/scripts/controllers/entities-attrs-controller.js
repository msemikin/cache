'use strict';
angular.module('db').controller('EntitiesAttrsCtrl', function ($scope, $rootScope, Restangular) {
    var baseEntities = $scope.baseProject.all('entities');

    $scope.entities = [];
    $scope.entity = null;
    $scope.entityName = '';
    $scope.attrName = '';

    function selectObject (entity) {
        $scope.entity = entity;
    }
    function updateObjects(entityId) {
        return baseEntities.getList()
            .then(function(entities) {
                $scope.entities = entities;

                var entity = typeof entityId === 'number' ? _.findWhere(entities, {
                    id: entityId
                }) : undefined;
                return entity;
            })
            .then(selectObject);
    }
    $scope.addEntity = function () {
        var entity = {
            name: $scope.entityName,
            projectId: $scope.baseProject.id
        };
        $scope.entityName = '';
        baseEntities.post(entity).then(function (response) {
            updateObjects(response.id);
        });
    };
    $scope.addAttr = function () {
        var entity = $scope.entity;
        var attr = {
            entityId: entity.id,
            name: $scope.attrName
        };
        entity.attrs.push(attr);
        Attribute.create(attr).then(function () {
            updateObjects(entity.id);
            $scope.attrName = '';
        });
    };
    $scope.onKeypress = function(event, callback) {
        if (event.keyCode === 13) {
            callback();
        }
    };
    $scope.selectObject = selectObject;
    $scope.deselectEntity = function () {
        $scope.entity = null;
    };

    updateObjects();
});
