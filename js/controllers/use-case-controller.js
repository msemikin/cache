'use strict';

var app = angular.module('cache');
app.controller('UsecaseCtrl', ['$scope', 'Diagram', function($scope, Diagram) {
    var diagram = Diagram.setup({
        name: 'usecase',
        diagramSelector: '.functional-model',
        paper: {
            el: $('#functional-model'),
            gridSize: 10,
            width: '100%',
            height: 600,
            linkView: 'UsecaseLinkView'
        },
        constructors: [{
            sourceSelector: '.actor',
            figureType: 'Actor'
        }, {
            sourceSelector: '.service',
            figureType: 'Service'
        }]
    });
}]);
