'use strict';
var app = angular.module('db');
app.controller('AttributeConstraintsCtrl', function($scope, AttributeConstraint, LinkConstraint, Object) {
    $scope.entities = [];
    var tabs = {
        attribute: {
            name: 'attribute',
            listHeadText: 'Ограничения атрибутов',
            detailsHeadText: 'Детали ограничения',
            dataProvider: AttributeConstraint,
            constraints: [],
            constraint: null,
            constraintName: '',
            changingDescription: false
        },
        link: {
            name: 'link',
            listHeadText: 'Ограничения связей',
            detailsHeadText: 'Детали ограничения',
            dataProvider: LinkConstraint,
            constraints: [],
            constraint: null,
            constraintName: '',
            changingDescription: false
        }
    };
    $scope.selectTab = function(name) {
        $scope.tab = tabs[name];
        updateConstraints();
    };
    $scope.tab = tabs.attribute;


    function updateObjects() {
        return Object.load().then(function(data) {
            $scope.entities = data;
        });
    }

    function selectConstraint(constraint) {
        // constraint is an id
        $scope.tab.constraint = constraint;
        if (constraint) {
            $scope.tab.changingDescription = !constraint.comment;
        }
        return constraint;
    }

    function updateConstraints(constraintId) {
        return $scope.tab.dataProvider.load()
            .then(function(constraints) {
                var constraint = typeof constraintId === 'number' ? _.findWhere(constraints, {
                    id: constraintId
                }) : constraints[0];
                $scope.tab.constraints = constraints;
                selectConstraint(constraint);
                return constraint;
            });
    }


    $scope.selectConstraint = selectConstraint;

    $scope.addConstraint = function() {
        var constraint = {
            name: $scope.tab.constraintName
        };
        $scope.tab.dataProvider.create(constraint)
            .then(function(response) {
                $scope.tab.constraintName = '';
                return updateConstraints(response.id);
            });
    };

    $scope.selectObject = function(entity) {
        var constraint = $scope.tab.constraint;
        constraint.entity = {
            id: entity.id,
            name: entity.name
        };
        // $scope.tab.dataProvider.update(constraint).then(function(response) {
        //     updateConstraints(constraint.id);
        // });
    };

    $scope.selectFirstObject = function(entity) {
        var constraint = $scope.tab.constraint;
        constraint.firstObject = entity;
        $scope.tab.dataProvider.update(constraint).then(function(response) {
            updateConstraints(constraint.id);
        });
    };

    $scope.selectSecondObject = function(entity) {
        var constraint = $scope.tab.constraint;
        constraint.secondObject = entity;
        $scope.tab.dataProvider.update(constraint).then(function(response) {
            updateConstraints(constraint.id);
        });
    };

    $scope.selectAttr = function(attr) {
        var constraint = $scope.tab.constraint;
        constraint.entity.attr = attr;
        $scope.tab.dataProvider.update(constraint).then(function(response) {
            updateConstraints(constraint.id);
        });
    };

    $scope.initDropdowns = function() {
        // $(document).ready(function() {
        //     $('.dropdown-toggle').dropdown();
        // });
    };
    $scope.initDropdowns();

    $scope.onKeypress = function(event) {
        if (event.keyCode === 13) {
            $scope.addConstraint();
        }
    };

    $scope.getAttrs = function(entity) {
        if (entity) {
            var entityIndex = _.findIndex($scope.entities, {
                id: entity.id
            });
            if (entityIndex === -1) {
                return [];
            }
            return $scope.entities[entityIndex].attrs;
        }
    };

    $scope.changeDescription = function() {
        $scope.tab.changingDescription = true;
    };

    $scope.saveDescription = function() {
        $scope.tab.changingDescription = false;
        var constraint = $scope.tab.constraint;
        $scope.tab.dataProvider.update(constraint).then(function() {
            updateConstraints(constraint.id);
        });
    };

    updateObjects().then(updateConstraints);
});
