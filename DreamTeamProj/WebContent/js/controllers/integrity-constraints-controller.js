'use strict';
var app = angular.module('db');
app.controller('AttributeConstraintsCtrl', function($scope, AttributeConstraint, LinkConstraint, Object) {
    $scope.objects = [];
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
            $scope.objects = data;
        });
    }

    function selectConstraint(constraint) {
        // constraint is an id
        $scope.tab.constraint = constraint;
        if (constraint) {
            $scope.tab.changingDescription = !constraint.description;
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

    $scope.selectObject = function(object) {
        var constraint = $scope.tab.constraint;
        constraint.object = {
            id: object.id,
            name: object.name
        };
        // $scope.tab.dataProvider.update(constraint).then(function(response) {
        //     updateConstraints(constraint.id);
        // });
    };

    $scope.selectFirstObject = function(object) {
        var constraint = $scope.tab.constraint;
        constraint.firstObject = object;
        $scope.tab.dataProvider.update(constraint).then(function(response) {
            updateConstraints(constraint.id);
        });
    };

    $scope.selectSecondObject = function(object) {
        var constraint = $scope.tab.constraint;
        constraint.secondObject = object;
        $scope.tab.dataProvider.update(constraint).then(function(response) {
            updateConstraints(constraint.id);
        });
    };

    $scope.selectAttr = function(attr) {
        var constraint = $scope.tab.constraint;
        constraint.object.attr = attr;
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

    $scope.getAttrs = function(object) {
        if (object) {
            var objectIndex = _.findIndex($scope.objects, {
                id: object.id
            });
            if (objectIndex === -1) {
                return [];
            }
            return $scope.objects[objectIndex].attrs;
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
