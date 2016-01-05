'use strict';
var app = angular.module("db");
app.controller("ObjectRelationsCtrl", function($scope, Diagram, $rootScope, $interval, Config, ObjectRelations) {
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
    ObjectRelations.load().then(function(data) {
        console.log(data);
        if (!data.diagram) {
            ObjectRelations.create(diagram.export()).then(function (data) {
                diagram.setId(data.id);
            });
        } else {
            diagram.import(JSON.parse(data.diagram));
            diagram.setId(data.id);
        }
        $interval(function () {
            ObjectRelations.update(diagram.export(), diagram.getId());
        }, Config.UPDATE_INTERVAL);
    });
    diagram.onCellAdd(function(cell) {
        $rootScope.$emit('objectRelationsCellAdded', cell);
    });
});
