'use strict';
var app = angular.module("db");
app.controller("ObjectRelationsCtrl", ['$scope', 'Diagram', '$rootScope', function($scope, Diagram, $rootScope) {
    var diagram = Diagram.setup({
        name: 'objectRelations',
        diagramSelector: '.object-relations-model',
        paper: {
            el: $('#object-relations-model'),
            gridSize: 10,
            width: '100%',
            height: 600,
            linkView: 'ObjectRelationsLinkView'
        },
        constructors: [{
            sourceSelector: '.object',
            figureType: 'Object'
        }]
    });

    diagram.onCellAdd(function(cell) {
        $rootScope.$emit('objectRelationsCellAdded', cell);
    });
}]);
