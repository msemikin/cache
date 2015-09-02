'use strict';
var app = angular.module('db');
app.controller("ERCtrl", ['$scope', 'Diagram', '$rootScope', function($scope, Diagram, $rootScope) {
    var diagram = Diagram.setup({
        name: 'er',
        diagramSelector: '.er-model',
        paper: {
            el: $('#er-model'),
            gridSize: 10,
            width: '100%',
            height: 600,
            linkView: 'ErLinkView'
        },
        constructors: [{
            sourceSelector: '.entity',
            figureType: 'Entity'
        }, {
            sourceSelector: '.attribute',
            figureType: 'Attribute'
        }, {
            sourceSelector: '.association',
            figureType: 'Association'
        }]
    });

    $rootScope.$on('objectRelationsCellAdded', function(event, cell) {
        diagram.bindNewFigure({
            type: 'Entity',
            position: cell.attributes.position,
            // now the new cell will react on all the changes of that cell
            boundCell: {
                id: cell.id,
                diagram: cell.prop('diagram')
            }
        });
    });

}]);
