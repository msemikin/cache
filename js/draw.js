var app = angular.module("cache", []);
var objD = new Array();

app.controller("drawController", function ($scope) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#canvas'),
        gridSize: 10,
        model: graph
    });

    var focused = undefined;

    // dbl-click
    paper.on("cell:pointerdblclick", function (cellView, evt, x, y) {
        $scope.renameValue = cellView.model.attributes.attrs.text.text;
        console.log(cellView.model.attributes);
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
        var list = document.getElementById("List3");
        var ind = list.selectedIndex;
        var txt = list[ind].text;
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
                text: txt
            }
        });

        list[ind].remove();
        var delInd = objSt.indexOf(txt);
        if (delInd > -1) objSt.splice(delInd,1);
        objD.push(txt);
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
    $scope.closeOptions = function () {
        $scope.optionsShow = false;
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
        var symbolLength = 5;
        var width = symbolLength * $scope.renameValue.length + 75;
        $scope.renameValue = $scope.renameValue.toLowerCase();
        $scope.renameValue = $scope.renameValue[0].toUpperCase() + $scope.renameValue.substr(1, $scope.renameValue.length);
        $scope.renameShow = false;
        focused.model.attr({
            rect: {
                width: width
            },
            text: {
                text: $scope.renameValue
            }
        });
    };
    $scope.cancelChange = function () {
        $scope.renameShow = false;
    };



});
