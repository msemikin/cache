'use strict';
var app = angular.module('db');
app.service('setupDragAndDrop', ['Figures', function(Figures) {

    function getDragAndDrop(graph, diagramSelector, figureType, diagramName) {

        var dragMode = false;
        var dragSelector = '.transfer';
        var $drag = null;
        var lastX = null;
        var lastY = null;
        var dragDiv = '<div class="transfer"></div>';

        function reset() {
            dragMode = false;
            $drag.remove();
        }

        function startDragging(eventData) {
            $(diagramSelector).prepend(dragDiv);
            $drag = $(dragSelector);

            var sourcePos = $(this).position();

            $drag.css({
                top: sourcePos.top,
                left: sourcePos.left
            });

            lastX = eventData.pageX;
            lastY = eventData.pageY;
            dragMode = true;
        }

        function moveDrag(eventData) {
            if (dragMode) {
                var deltaX = eventData.pageX - lastX;
                var deltaY = eventData.pageY - lastY;

                $drag.css('top', '+=' + deltaY);
                $drag.css('left', '+=' + deltaX);

                lastX = eventData.pageX;
                lastY = eventData.pageY;
            }
        }

        function createFigure() {
            console.log(diagramName);
            if (dragMode) {
                reset();
                graph.addCell(Figures.createFigure({
                    type: figureType,
                    position: {
                        x: parseInt($drag.css('left')) - 20,
                        y: parseInt($drag.css('top')) - 135
                    },
                    diagram: diagramName
                }));
            }
        }

        return {
            startDragging: startDragging,
            moveDrag: moveDrag,
            createFigure: createFigure
        };
    }

    /**
     * Will setup the creation of figures on the diagram by drag-and-drop technique
     * @param  {[type]} params.graph [description]
     * @param  {[type]} params.diagramSelector [description]
     * @param  {[type]} params.constructors [description]
     * @param  {[type]} params.diagramName [description]
     * @return {[type]}        [description]
     */
    return function(params) {
        $.each(params.constructors, function(index, constructor) {
            var dragAndDrop = getDragAndDrop(params.graph, params.diagramSelector, constructor.figureType, params.diagramName);
            $(constructor.sourceSelector).mousedown(dragAndDrop.startDragging);
            $(params.diagramSelector).mousemove(dragAndDrop.moveDrag);
            $(params.diagramSelector).mouseup(dragAndDrop.createFigure);
        });
    };
}]);
