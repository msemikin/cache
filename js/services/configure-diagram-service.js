'use strict';
var app = angular.module('cache');
app.service('configureDiagram', ['Figures', 'Links', function(Figures, Links) {
    return function(graph, paper) {
        var linkDragMode = false;
        var link = null;
        var focusedModel = null;

        function reset() {
            linkDragMode = false;
            link = null;
            focusedModel = null;
        }

        function deselect(cellModel) {
            if (cellModel) {
                cellModel.prop('selected', false);
                cellModel.prop('renaming', false);
            }
        }

        function handleSelect(cellModel) {
            deselect(focusedModel);
            cellModel.prop('selected', true);
            focusedModel = cellModel;
        }

        graph.on('add', function(cell) {
            if (!cell.isLink()) {
                var cellView = paper.findViewByModel(cell);

                // create link
                cellView.$box.find('.action--connect').on('mousedown', function() {
                    linkDragMode = true;
                    link = Links.createLink({id: cell.id}, {id: cell.id});
                    graph.addCell(link);
                    deselect(cell);
                });
            }
        });

        paper.on('cell:pointerclick', function(cellView, evt, x, y) {
            handleSelect(cellView.model);
        });

        // move link
        console.log(graph);
        paper.$el.on('mousemove', function(event) {
            if (linkDragMode) {
                var offset = $(this).offset();
                link.set('target', {
                    x: event.pageX - offset.left,
                    y: event.pageY - offset.top
                });
            }
        });

        // finish creating link
        paper.$el.on('mouseup', function(event) {
            if (linkDragMode) {
                var offset = $(this).offset(),
                    x = event.pageX - offset.left,
                    y = event.pageY - offset.top,
                    elementBelow = graph.get('cells').find(function(cell) {
                        if (cell instanceof joint.dia.Link) return false; // Not interested in links.
                        if (cell.getBBox().containsPoint(g.point(x, y))) {
                            return true;
                        }
                        return false;
                    });
                if (elementBelow && !_.contains(graph.getNeighbors(elementBelow), focusedModel)) {
                    link.set('target', {
                        id: elementBelow.id
                    });
                } else {
                    link.remove();
                }
                reset();
            }
        });

        // trigger rename
        paper.on('cell:pointerdblclick', function(cellView, evt, x, y) {
            handleSelect(cellView.model);
            if (!(cellView.model.attributes.type === 'link')) {
                cellView.model.prop('renaming', true);
                console.log(cellview.model.attr({}))
            }
        });

        // trigger deselect
        paper.on('blank:pointerclick', function() {
            deselect(focusedModel);
        });

        // trigger link utils to show
        paper.on('cell:mouseover', function (cellView, evt, x, y) {
            if (cellView.model.isLink()) {
                cellView.model.prop('hovered', true);
            }
        });
        // trigger link utils to hide
        paper.on('cell:mouseout', function (cellView, evt, x, y) {
            if (cellView.model.isLink()) {
                cellView.model.prop('hovered', false);
            }
        });
    };
}]);
