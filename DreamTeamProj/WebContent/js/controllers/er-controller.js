'use strict';
var app = angular.module('db');
app.controller("ERCtrl", function($scope, Diagram, $rootScope, $interval, Config, ER) {
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
    ER.load().then(function(data) {
        console.log(data);
        if (!data.diagram) {
            ER.create(diagram.export()).then(function (data) {
                diagram.setId(data.id);
            });
        } else {
            diagram.import(JSON.parse(data.diagram));
            diagram.setId(data.id);
        }
        $interval(function () {
            ER.update(diagram.export(), diagram.getId());
        }, Config.UPDATE_INTERVAL);
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
});
