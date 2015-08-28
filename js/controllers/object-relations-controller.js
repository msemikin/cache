'use strict';
var app = angular.module("cache");
app.controller("ObjectRelationsCtrl", ['$scope', 'Diagram', function($scope, Diagram) {
    Diagram.setup({
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
}]);
