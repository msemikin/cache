'use strict';
var app = angular.module('cache');
app.service('setupDragAndDrop', ['Figures', function(Figures) {

    function getDragAndDrop(graph, diagramSelector, figureType) {
        console.log(arguments);

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
            if (dragMode) {
                reset();
                graph.addCell(Figures.createFigure(figureType, {
                    x: parseInt($drag.css('left')) - 20,
                    y: parseInt($drag.css('top')) - 135
                }));
            }
        }

        return {
            startDragging: startDragging,
            moveDrag: moveDrag,
            createFigure: createFigure
        };
    }

    return function(params) {
        $.each(params.constructors, function(index, constructor) {
            var dragAndDrop = getDragAndDrop(params.graph, params.diagramSelector, constructor.figureType);
            $(constructor.sourceSelector).mousedown(dragAndDrop.startDragging);
            $(params.diagramSelector).mousemove(dragAndDrop.moveDrag);
            $(params.diagramSelector).mouseup(dragAndDrop.createFigure);
        });
    };
}]);
