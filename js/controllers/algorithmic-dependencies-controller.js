'use strict';
var app = angular.module('cache');
app.controller('AlgorithmicDependenciesCtrl', ['$scope', 'AlgorithmicDependency', 'Object', function($scope, AlgorithmicDependency){
    $scope.initDropdowns = function () {
        $(document).ready(function () {
            $('.dropdown-toggle').dropdown();
        });
    };
    $scope.initDropdowns();

    $scope.algos = AlgorithmicDependency.load();

    var id = 0;
    $scope.addAlgo = function(){
        AlgorithmicDependency.create({
            id: id++,
            res: {
                object: undefined,
                attr: undefined
            },
            sources: [],
            formula: undefined
        });

        this.initDropdowns();
    };

    $scope.srcObj = undefined;
    $scope.srcAttr = undefined;
    $scope.srcObj = undefined;
    $scope.srcAttr = undefined;

    $scope.setSourceObject = function(algoId, object){
        this.srcObj = object;
    };
    $scope.setSourceAttr = function(attr){

    };
    $scope.getSourceAttrs = function(algoId, object){}
    $scope.getSourceObject = function(){}
    $scope.setResObject = function(){}
    $scope.setResAttr = function(){}
    $scope.addSource = function(){}


    function getAlgo(algoId) {
        return AlgorithmicDependency.get(algoId);
    }
    function getObject(name) {
        return _.first(_.filter(objects, function(object) {
            return object.name === name;
        }));
    }
}]);