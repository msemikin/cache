'use strict';
var app = angular.module('db');
app.controller('AlgorithmicDependenciesCtrl', ['$scope', 'AlgorithmicDependency', 'Object', function($scope, AlgorithmicDependency, Object) {
    $scope.initDropdowns = function() {
        // $(document).ready(function() {
        //     $('.dropdown-toggle').dropdown();
        // });
    };
    $scope.initDropdowns();

    $scope.dependencyName = '';
    $scope.sourceVariable = '';
    $scope.sourceObj = null;
    $scope.entities = [];
    $scope.dependencies = [];
    $scope.formulaEditing = true;

    $scope.setDestObj = function(entity) {
        $scope.dependency.resultField = entity;
    };

    $scope.setDestAttr = function(attr) {
        var dependency = $scope.dependency;
        dependency.resultField.attr = attr;
        AlgorithmicDependency.update(dependency).then(function () {
            $scope.sourceVariable = '';
            return updateDependencies(dependency.id);
        });
    };

    $scope.setSourceObj = function(entity) {
        var sourceObj = {
            id: entity.id,
            name: entity.name
        };
        $scope.sourceObj = sourceObj;
    };

    $scope.setSourceAttr = function(attr) {
        $scope.sourceObj.attr = attr;
    };

    function resetSource() {
        $scope.sourceVariable = '';
        $scope.sourceObj = null;
    }

    $scope.addSource = function() {
        var dependency = $scope.dependency;
        dependency.sourceFields.push({
            variable: $scope.sourceVariable,
            entity: $scope.sourceObj
        });
        AlgorithmicDependency.insertSourceField(dependency).then(function () {
            resetSource();
            updateDependencies(dependency.id);
            $scope.initDropdowns();
        });
    };

    $scope.replaceSourceObj = function (source, entity) {
        var dependency = $scope.dependency;
        var sourceIndex = _.findIndex(dependency.sourceFields, {variable: source.variable});
        var sourceObj = {
            id: entity.id,
            name: entity.name
        };
        dependency.sourceFields[sourceIndex].entity = sourceObj;
        AlgorithmicDependency.update(dependency).then(function () {
            return updateDependencies(dependency.id);
        });
    };

    $scope.replaceSourceAttr = function (source, attr) {
        var dependency = $scope.dependency;
        var sourceIndex = _.findIndex(dependency.sourceFields, {variable: source.variable});
        dependency.sourceFields[sourceIndex].entity.attr = attr;
        AlgorithmicDependency.update(dependency).then(function () {
            return updateDependencies(dependency.id);
        });
    };

    $scope.addDependency = function() {
        var dependency = {
            name: $scope.dependencyName,
            sourceFields: [],
            formula: ''
        };

        AlgorithmicDependency.create(dependency)
            .then(function(response) {
                $scope.dependencyName = '';
                return updateDependencies(response.id);
            });
    };

    $scope.removeSource = function (source) {
        var dependency = $scope.dependency;
        var sourceIndex = _.findIndex(dependency.sourceFields, {variable: source.variable});
        dependency.sourceFields.splice(sourceIndex, 1);
        AlgorithmicDependency.update(dependency).then(function () {
            return updateDependencies(dependency.id);
        });
    };

    function updateObjects() {
        return Object.load().then(function(data) {
            $scope.entities = data;
        });
    }

    $scope.getAttrs = function (entity) {
        if (entity) {
            var entityIndex = _.findIndex($scope.entities, {id: entity.id});
            return entityIndex === -1 ? null : $scope.entities[entityIndex].attrs;
        }
    };

    function selectDependency(dependency) {
        $scope.dependency = dependency;
        if (dependency) {
            $scope.formulaEditing = !dependency.formula;
        }
        return dependency;
    }

    function updateDependencies(dependencyId) {
        return AlgorithmicDependency.load()
            .then(function(dependencies) {
                var dependency = typeof dependencyId === 'number' ? _.findWhere(dependencies, {
                    id: dependencyId
                }) : dependencies[0];
                $scope.dependencies = dependencies;
                selectDependency(dependency);
                return dependency;
            });
    }


    $scope.selectDependency = selectDependency;
    $scope.initDropdowns = function() {
        $(document).ready(function() {
            $('.dropdown-toggle').dropdown();
        });
    };
    $scope.onKeypress = function(event) {
        if (event.keyCode === 13) {
            $scope.addDependency();
        }
    };
    $scope.saveFormula = function () {
        var dependency = $scope.dependency;
        AlgorithmicDependency.update(dependency).then(function () {
            $scope.formulaEditing = false;
            updateDependencies(dependency.id);
        });
    };
    $scope.editFormula = function () {
        $scope.formulaEditing = true;
    };
    updateDependencies().then(updateObjects);

}]);
