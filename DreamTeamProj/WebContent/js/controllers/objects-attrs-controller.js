'use strict';
angular.module('db').controller('ObjectsAttrsCtrl', function (Object, $scope, $rootScope) {
    $scope.objects = [];
    $scope.object = null;
    $scope.objectName = '';
    $scope.attrName = '';

    console.log($rootScope);

    function selectObject (object) {
        $scope.object = object;
        $rootScope.showAttrs();
    }
    function updateObjects(objectId) {
        return Object.load()
            .then(function(objects) {
                var object = typeof objectId === 'number' ? _.findWhere(objects, {
                    id: objectId
                }) : objects[0];
                $scope.objects = objects;
                return object;
            })
            .then(selectObject);
    }
    $scope.addObject = function () {
        var object = {
            name: $scope.objectName
        };
        Object.create(object).then(function (response) {
            updateObjects(response.id);
        });
    };
    $scope.addAttr = function () {
        var object = $scope.object;
        var attr = {
            name: $scope.attrName
        };
        object.attrs.push(attr);
        Object.update(object).then(function () {
            updateObjects(object.id);
        });
    };
    $scope.onKeypress = function(event, callback) {
        if (event.keyCode === 13) {
            callback();
        }
    };
    $scope.selectObject = selectObject;

    updateObjects();
});
