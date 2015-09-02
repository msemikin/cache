'use strict';
/* globals joint:true */
angular.module('db').service('Diagram', ['configureDiagram', 'setupDragAndDrop', 'Links', 'Figures', function(configureDiagram, setupDragAndDrop, Links, Figures) {
    return {
        /**
         * Constructs and configures a diagram
         * @param  {object} params [description]
         * @param  {string} params.name [description]
         * @param  {string} params.diagramSelector [description]
         * @param  {object} params.paper [description]
         * @param  {jqueryElement} params.paper.el [description]
         * @param  {number} params.paper.gridSize [description]
         * @param  {number|string} params.paper.width [description]
         * @param  {number|string} params.paper.height [description]
         * @param  {string} params.paper.linkView [description]
         * @param  {array} params.constructors [description]
         * @return {object}        Diagram object
         */
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
                constructors: params.constructors,
                diagramName: params.name
            });
            return {
                /**
                 * Creates, adds a figure and binds it to a cell from other diagram
                 * @param  {[type]} bindParams.type      [description]
                 * @param  {[type]} bindParams.position  [description]
                 * @param  {[type]} bindParams.text      [description]
                 * @param  {[type]} bindParams.boundCell [description]
                 * @return {[type]}           [description]
                 */
                bindNewFigure: function(bindParams) {
                    bindParams.name = params.name;
                    var figure = Figures.createFigure(bindParams);
                    graph.addCell(figure);
                },
                onCellAdd: function(callback) {
                    graph.on('add', function (cell) {
                        if (!cell.isLink()) {
                            callback(cell);
                        }
                    });
                }
            };
        }
    };
}]);
