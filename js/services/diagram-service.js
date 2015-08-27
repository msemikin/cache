'use strict';
angular.module('cache').service('Diagram', ['configureDiagram', 'setupDragAndDrop', 'Links', function(configureDiagram, setupDragAndDrop, Links) {
    return {
        setup: function(params) {
            var graph = new joint.dia.Graph(),
                paper = new joint.dia.Paper($.extend(params.paper, {
                    model: graph,
                    linkView: Links.getLinkView(params.paper.linkView)
                }));


            configureDiagram(graph, paper);
            setupDragAndDrop({
                graph: graph,
                diagramSelector: params.diagramSelector,
                constructors: params.constructors
            });
        }
    };
}]);
