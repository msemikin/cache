var app = angular.module('cache');
app.controller('UseCaseController',['$scope', 'diagramService', 'dragAndDropService', 'linkManipulationService', function($scope, diagram, dragAndDrop, linkManipulation){
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#functional-model'),
		width: '100%',
		height: 600,
        gridSize: 10,
        model: graph,
    })

    var focused = undefined;

    linkManipulation(graph, paper);
    dragAndDrop('.actor', '.functional-model', undefined, graph, diagram.actor);
    dragAndDrop('.service', '.functional-model', undefined, graph, diagram.service);
    

    // dbl-click
    paper.on("cell:pointerdblclick", function(cellView, evt, x, y) {
        $scope.renameValue = cellView.model.attributes.attrs.text.text;
        $scope.openOptions();
        focused = cellView;
    });

    
    // for resizing
    /*    paper.on("cell:pointerdown", function (cellView, evt, x, y) {
            console.log(x + ", " + y);
            var figpos = cellView.model.attributes.position;
            var figsize = cellView.model.attributes.attrs.rect;
            console.log(cellView.model.attributes.attrs.text);
            console.log(isOnBorder(figpos.x, figpos.y, figsize.width, figsize.height, x, y));
        });
    */

    function isOnBorder(figx, figy, figwidth, figheight, curx, cury) {
        console.log(figheight);
        if (Math.abs(figx - curx) < 10) {
            return "left";
        } else if (Math.abs(figy - cury) < 10) {
            return "top";
        } else if (Math.abs((curx - figx) - figwidth) < 10) {
            return "right";
        } else if (Math.abs((cury - figy) - figheight) < 10) {
            return "bottom";
        }
    }

    $scope.initService = function() {
        graph.addCell(circle);
    };

    $scope.optionsShow = false;
    $scope.openOptions = function() {
        $scope.$apply(function() {
            $scope.optionsShow = true;
        })
    }
    $scope.closeOptions = function() {
        $scope.optionsShow = false;
    }

    $scope.deleteObj = function() {
        $scope.optionsShow = false;
        focused.remove();
		focused = undefined;
    }

    $scope.renameValue = undefined;
    $scope.renameShow = false;
    $scope.renameObj = function() {
        $scope.optionsShow = false;
        $scope.renameShow = true;
    };
    $scope.submitChange = function() {
        var symbolLength = 7;
        var width = symbolLength * $scope.renameValue.length + 80;
        $scope.renameValue = $scope.renameValue.toLowerCase();
        $scope.renameValue = $scope.renameValue[0].toUpperCase() + $scope.renameValue.substr(1, $scope.renameValue.length);
        $scope.renameShow = false;
        focused.model.attr({
            text: {
                text: $scope.renameValue
            }
        });
		focused.model.resize(width, 40);
    };

    $scope.cancelChange = function() {
        $scope.renameShow = false;
    };

}]);
