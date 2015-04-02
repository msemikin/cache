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

    paper.on("cell:pointerdblclick", function (cellView, evt, x, y) {
        $scope.renameValue = cellView.model.attributes.attrs.text.text;
        $scope.openOptions();
        focused = cellView;
    });

    $scope.initAttribute = function () {
        var ell = new joint.shapes.basic.Circle({
            position: {
                x: 50,
                y: 70
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
                x: 50,
                y: 70
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
                x: 50,
                y: 70
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