var constraints = [];

var app = angular.module('cache');
app.controller('ConstraintsController', ['$scope', function($scope){
    $scope.initDropdowns = function () {
        console.log('initDropdowns');
        $(document).ready(function () {
            $('.dropdown-toggle').dropdown();
        });
    };
    $scope.initDropdowns();
    
    $scope.constraints = constraints;
    
    var id = 0;
    $scope.addConstraint = function(){
        
        var object = {
            name: undefined,
            attrs: []
        }
        
        constraints.push({
            id: id++,
            object: object,
            attr: undefined,
            text: Text,
            isLinkConstraint: false
        });
    
        this.initDropdowns();
    }
    
    $scope.removeConstraint = function(constraintId){
        constraints.splice(constraintId);
    }
    $scope.changeTab = function(tab) {
        this.tab = tab;
    }
    $scope.tab = 'attrs';
    $scope.objects = _.map(objects, function(object) {
        return object.name;
    });
    $scope.getObject = function(constraintId) {
        return _.first(_.where(constraints, {id : constraintId}));
    }
    $scope.getAttrs = function(constraintId) {
        var object = getConstraint(constraintId).object;
        if(object){
            return object.attrs;
        }
    }
    $scope.isAttrs = function() { return this.tab === 'attrs' };
    $scope.selectObject = function(constraintId, objectName) {
        var object = getConstraint(constraintId).object;
        object.name = objectName;
        object.attrs = getObject(objectName).attribute.slice();
    }
    $scope.selectAttr = function(constraintId, attr) {
        var constraint = getConstraint(constraintId);
        constraint.attr = attr;
    }
    $scope.getSelectedObject = function(constraintId) {
        var name = getConstraint(constraintId).object.name;
        return name ? name : 'Выберите объект';
    };
    $scope.getSelectedAttr = function(constraintId) {
        var name = getConstraint(constraintId).attr;
        return name ? name : 'Выберите атрибут';
    };
    function getConstraint(constraintId) {
        return _.first(_.filter(constraints, function(constraint) {
            return constraint.id == constraintId;
        }));
    }
    function getObject(name) {
        return _.first(_.filter(objects, function(object) {
            return object.name === name;
        }));
    }
}]);