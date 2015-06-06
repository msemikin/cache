var app = angular.module("cache");

app.controller("ObjectDiagramController", ['$scope', 'diagramService', 'dragAndDropService', 'linkManipulationService', function ($scope, diagram, dragAndDrop, linkManipulation) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#object-relation-model'),
        gridSize: 10,
        model: graph,
        width: '100%',
        height: 600,
    })

    diagrams.objectRelation = graph;

    linkManipulation(graph, paper);
    dragAndDrop('.object', '.object-relation-model', undefined, graph, diagram.object);

    var focused = undefined;

    // dbl-click
    paper.on("cell:pointerdblclick", function (cellView, evt, x, y) {
        if (cellView.model.attributes.type === 'link') {
            var vertices = cellView.model.get('vertices').reverse().slice(1);
            for (var i = 0; i < vertices.length; i++) {
                if (vertices[i].x == x && vertices[i].y == y) {
                    vertices.splice(i, 1);
                }
            }
            cellView.model.set('vertices', vertices);
            $scope.linkLabel = cellView.model.attributes.labels[0].attrs.text.text;
            focused = cellView;
            $scope.openLinkOptions();
        } // clicked on object
        else {
            $scope.renameValue = cellView.model.attributes.attrs.text.text;
            $scope.openObjectOptions();
        }
        focused = cellView;
        return false;
    });

    paper.on("cell:pointerup", function (cellView, evt, x, y) {
        if (cellView.model.attributes.type === "basic.Circle") {
            var obj = objects[findIndByObjName(cellView.model.attributes.attrs.text.text)];
            if (obj) {
                obj.RelX = cellView.model.attributes.position.x;
                obj.RelY = cellView.model.attributes.position.y;
            }
        }
        return false;
    });


    // link options	
    $scope.linkLabel = undefined;
    $scope.linkOptionsShow = false;

    $scope.openLinkOptions = function () {
        $scope.$apply(function () {
            $scope.linkOptionsShow = true;
        });
    };

    $scope.submitLinkChange = function () {
        focused.model.label(1, {
            attrs: {
                text: {
                    text: this.linkLabel
                }
            }
        });
        $scope.linkOptionsShow = false;
    };
    $scope.cancelLinkChange = function () {
        $scope.linkOptionsShow = false;
    };

    // object options
    $scope.objectOptionsShow = false;
    $scope.renameValue = undefined;
    $scope.renameShow = false;


    $scope.openObjectOptions = function () {
        $scope.$apply(function () {
            $scope.objectOptionsShow = true;
        })
    }
    $scope.closeObjectOptions = function () {
        $scope.objectOptionsShow = false;
    }

    $scope.deleteObj = function () {
        var text = focused.el.textContent;
        $scope.objectOptionsShow = false;
        focused.remove();
        objSt.push(text);
        getList();
    }

    $scope.renameObj = function () {
        $scope.objectOptionsShow = false;
        $scope.renameShow = true;
    };
    $scope.submitRename = function () {
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
    $scope.cancelRename = function () {
        $scope.renameShow = false;
    };
}]);