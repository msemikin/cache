'use strict';
var app = angular.module('db');
app.controller('UsecaseCtrl', function($scope, Diagram, $interval, Config, Restangular) {
    var baseUsecase = $scope.baseProject.one('diagrams', 'use-case');
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
    baseUsecase.get().then(function(data) {
        console.log(data);
        if (!data.diagram) {
            UseCase.create(diagram.export()).then(function (data) {
                diagram.setId(data.id);
            });
        } else {
            diagram.import(JSON.parse(data.diagram));
            diagram.setId(data.id);
        }
        $interval(function () {
            UseCase.update(diagram.export(), diagram.getId());
        }, Config.UPDATE_INTERVAL);
    });
    diagram.onCellAdd(function(cell) {
        if (cell.attributes.type === 'cache.Actor') {
            Actor.create({
                actorName: cell.attributes.attrs.text.text
            }).then(function (response) {
                cell.attr('id', response.id);
                console.log(cell.attr('id'));
            });

        }
    });
});
