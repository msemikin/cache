'use strict';
var app = angular.module('db');
app.factory('CommonCtrlFactory', function(Utils, Object) {

    /**
     * [function description]
     * @param  {[type]} params.$scope    [description]
     * @param  {[type]} params.Element [description]
     * @param  {[type]} params.listName [description]
     * @param  {[type]} params.entityName [description]
     * @return {[type]}           [description]
     */
    return function(params) {
        var listName = params.listName,
            entityName = params.entityName,
            $scope = params.$scope,
            dataProvider = params.dataProvider;

        params.$scope.entities = [];
        params.$scope[listName] = [];
        $scope[entityName] = null;
        $scope.entityName = null;
        $scope.availableAttrs = {};

        function updateObjects() {
            return Object.load().then(function(data) {
                $scope.entities = data;
            });
        }

        function fillAvailableAttrs(entity) {
            var entityObjects = entity.entities;
            _.each(entityObjects, function(entityObject) {
                var originalObject = _.findWhere($scope.entities, {
                    id: entityObject.id
                });
                if (originalObject) {
                    $scope.availableAttrs[originalObject.id] = Utils.difference(originalObject.attrs, entityObject.attrs);
                }
            });
        }

        function fillAvailableObjects(entity) {
            $scope.availableObjects = Utils.difference($scope.entities, entity.entities);
            return entity;
        }

        function selectElement(entity) {
            // entity is an id
            $scope[entityName] = entity;
            if (entity) {
                fillAvailableObjects(entity);
                fillAvailableAttrs(entity);
            }
            return entity;
        }

        function updateElements(entityId) {
            return dataProvider.load()
                .then(function(entities) {
                    var entity = typeof entityId === 'number' ? _.findWhere(entities, {
                        id: entityId
                    }) : entities[0];
                    $scope[listName] = entities;
                    selectElement(entity);
                    return entity;
                });
        }


        $scope.selectElement = selectElement;

        $scope.addElement = function() {
            var entity = {
                name: $scope.entityName,
                entities: []
            };
            dataProvider.create(entity)
                .then(function(response) {
                    $scope[entityName] = '';
                    return updateElements(response.id);
                });
        };

        $scope.addObject = function(entity) {
            var entity = $scope[entityName];
            entity.entities.push(entity);
            dataProvider.update(entity).then(function(response) {
                updateElements(entity.id);
            });
        };

        $scope.addAttr = function(entity, attr) {
            var entity = $scope[entityName];
            var entityIndex = _.findIndex(entity.entities, {
                id: entity.id
            });
            entity.entities[entityIndex].attrs.push(attr);
            dataProvider.update(entity).then(function(response) {
                updateElements(entity.id);
            });
        };

        $scope.removeAttr = function(entity, attr) {
            var entity = $scope[entityName];
            var entityIndex = _.findIndex(entity.entities, {
                id: entity.id
            });
            var attrIndex = _.findIndex(entity.entities[entityIndex].attrs, {
                id: attr.id
            });
            entity.entities[entityIndex].attrs.splice(attrIndex, 1);
            dataProvider.update(entity).then(function(response) {
                updateElements(entity.id);
            });
        };

        $scope.removeObject = function(entity) {
            var entity = $scope[entityName];
            var entityIndex = _.findIndex(entity.entities, {
                id: entity.id
            });
            entity.entities.splice(entityIndex, 1);
            dataProvider.update(entity).then(function(response) {
                updateElements(entity.id);
            });
        };

        $scope.initDropdowns = function() {
            $(document).ready(function() {
                $('.dropdown-toggle').dropdown();
            });
        };

        $scope.onKeypress = function(event) {
            if (event.keyCode === 13) {
                $scope.addElement();
            }
        };

        updateObjects().then(updateElements);
    };
});
