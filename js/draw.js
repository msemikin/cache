var app = angular.module("cache", []);
app.controller("drawController", function ($scope) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#canvas'),
        gridSize: 10,
        model: graph
    });
    console.log(joint.shapes.basic);

    var figures = [];
    var focused = undefined;

    paper.on("cell:pointerdblclick", function (cellView, evt, x, y) {
        $scope.dialogValue = cellView.model.attributes.attrs.text.text;
        $scope.openDialog();
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
        figures.push(ell);
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
        figures.push(rect);
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
        figures.push(rhombus);
    };
    $scope.dialogValue = undefined;
    $scope.dialogShow = false;
    $scope.openDialog = function () {
        $scope.$apply(function () {
            $scope.dialogShow = true;
        });
    };
    $scope.submitChange = function () {
        $scope.dialogShow = false;
        focused.model.attr({
            text: {
                text: $scope.dialogValue
            }
        });
    };
    $scope.cancelChange = function () {
        $scope.dialogShow = false;
    };

    //То самое удаление
    $scope.deleteObj = function () {
        $scope.dialogShow = false;

        //Нужно доработать (удаляет только текст, без фигуры)
        focused.remove();

        var ind = figures.indexOf(focused);
        figures.splice(ind);
    }


});