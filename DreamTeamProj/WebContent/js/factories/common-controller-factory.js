'use strict';
var app = angular.module('db');
app.factory('CommonCtrlFactory', function(Utils, Object) {

    /**
     * [function description]
     * @param  {[type]} params.$scope    [description]
     * @param  {[type]} params.Element [description]
     * @param  {[type]} params.listName [description]
     * @param  {[type]} params.elementName [description]
     * @return {[type]}           [description]
     */
    return function(params) {
        var listName = params.listName,
            elementName = params.elementName,
            $scope = params.$scope,
            dataProvider = params.dataProvider;

        params.$scope.objects = [];
        params.$scope[listName] = [];
        $scope[elementName] = null;
        $scope.elementName = null;
        $scope.availableAttrs = {};

        function updateObjects() {
            return Object.load().then(function(data) {
                $scope.objects = data;
            });
        }

        function fillAvailableAttrs(element) {
            var elementObjects = element.objects;
            _.each(elementObjects, function(elementObject) {
                var originalObject = _.findWhere($scope.objects, {
                    id: elementObject.id
                });
                if (originalObject) {
                    $scope.availableAttrs[originalObject.id] = Utils.difference(originalObject.attrs, elementObject.attrs);
                }
            });
        }

        function fillAvailableObjects(element) {
            $scope.availableObjects = Utils.difference($scope.objects, element.objects);
            return element;
        }

        function selectElement(element) {
            // element is an id
            $scope[elementName] = element;
            if (element) {
                fillAvailableObjects(element);
                fillAvailableAttrs(element);
            }
            return element;
        }

        function updateElements(elementId) {
            return dataProvider.load()
                .then(function(elements) {
                    var element = typeof elementId === 'number' ? _.findWhere(elements, {
                        id: elementId
                    }) : elements[0];
                    $scope[listName] = elements;
                    selectElement(element);
                    return element;
                });
        }


        $scope.selectElement = selectElement;

        $scope.addElement = function() {
            var element = {
                name: $scope.elementName,
                objects: []
            };
            dataProvider.create(element)
                .then(function(response) {
                    $scope[elementName] = '';
                    return updateElements(response.id);
                });
        };

        $scope.addObject = function(object) {
            var element = $scope[elementName];
            element.objects.push(object);
            dataProvider.update(element).then(function(response) {
                updateElements(element.id);
            });
        };

        $scope.addAttr = function(object, attr) {
            var element = $scope[elementName];
            var objectIndex = _.findIndex(element.objects, {
                id: object.id
            });
            element.objects[objectIndex].attrs.push(attr);
            dataProvider.update(element).then(function(response) {
                updateElements(element.id);
            });
        };

        $scope.removeAttr = function(object, attr) {
            var element = $scope[elementName];
            var objectIndex = _.findIndex(element.objects, {
                id: object.id
            });
            var attrIndex = _.findIndex(element.objects[objectIndex].attrs, {
                id: attr.id
            });
            element.objects[objectIndex].attrs.splice(attrIndex, 1);
            dataProvider.update(element).then(function(response) {
                updateElements(element.id);
            });
        };

        $scope.removeObject = function(object) {
            var element = $scope[elementName];
            var objectIndex = _.findIndex(element.objects, {
                id: object.id
            });
            element.objects.splice(objectIndex, 1);
            dataProvider.update(element).then(function(response) {
                updateElements(element.id);
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
