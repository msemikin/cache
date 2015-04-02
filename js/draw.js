var app = angular.module("cache", []);
app.controller("drawController", function ($scope) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#canvas'),
        gridSize: 10,
        model: graph
    });
    console.log(joint.shapes.basic);

    var focused = undefined;

    // dbl-click
    paper.on("cell:pointerdblclick", function (cellView, evt, x, y) {
        $scope.renameValue = cellView.model.attributes.attrs.text.text;
        $scope.openOptions();
        focused = cellView;
    });
    // connecting
    paper.on('cell:pointerup', function (cellView, evt, x, y) {

        // Find the first element below that is not a link nor the dragged element itself.
        var elementBelow = graph.get('cells').find(function (cell) {
            if (cell instanceof joint.dia.Link) return false; // Not interested in links.
            if (cell.id === cellView.model.id) return false; // The same element as the dropped one.
            if (cell.getBBox().containsPoint(g.point(x, y))) {
                return true;
            }
            return false;
        });

        // If the two elements are connected already, don't
        // connect them again (this is application specific though).
        if (elementBelow && !_.contains(graph.getNeighbors(elementBelow), cellView.model)) {

            graph.addCell(new joint.dia.Link({
                source: {
                    id: cellView.model.id
                },
                target: {
                    id: elementBelow.id
                },
                attrs: {
                    '.marker-source': {
                        d: 'M 10 0 L 0 5 L 10 10 z'
                    }
                }
            }));
            // Move the element a bit to the side.
            cellView.model.translate(100, 100);
        }
    });

    $scope.initAttribute = function () {
        var ell = new joint.shapes.basic.Circle({
            position: {
                x: 100,
                y: 100
            },
            size: {
                width: 100,
                height: 40
            }
        })
        ell.attr({
            text: {
                text: 'Empty'
            }
        });
        graph.addCell(ell);
    };
    $scope.initEntity = function () {
        var rect = new joint.shapes.basic.Rect({
            position: {
                x: 100,
                y: 100
            },
            size: {
                width: 100,
                height: 40
            }
        })
        rect.attr({
            text: {
                text: 'Empty'
            }
        });
        graph.addCell(rect);
    };
    $scope.initAssociation = function () {
        var rhombus = new joint.shapes.basic.Rhombus({
            position: {
                x: 100,
                y: 100
            },
            size: {
                width: 100,
                height: 40
            }
        })
        rhombus.attr({
            text: {
                text: 'Empty'
            }
        });
        graph.addCell(rhombus);
    };
    $scope.optionsShow = false;
    $scope.openOptions = function () {
        $scope.$apply(function () {
            $scope.optionsShow = true;
        })
    }

    //То самое удаление
    $scope.deleteObj = function () {
        $scope.optionsShow = false;
        focused.remove();
    }

    $scope.renameValue = undefined;
    $scope.renameShow = false;
    $scope.renameObj = function () {
        $scope.optionsShow = false;
        $scope.renameShow = true;
    };
    $scope.submitChange = function () {
        $scope.renameShow = false;
        focused.model.attr({
            text: {
                text: $scope.renameValue
            }
        });
    };
    $scope.cancelChange = function () {
        $scope.renameShow = false;
    };



});