var app = angular.module("cache", []);
app.controller("drawController", function ($scope) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#canvas'),
        gridSize: 10,
        model: graph
    });
    var figures = [];
    var focused = undefined;

    $scope.initEntity = function () {
        this.initAttribute();
    };
    $scope.initAttribute = function () {
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
        graph.addCell(rect);
        figures.push(rect);
    };

    $scope.dialogValue = undefined;
    $scope.dialogShow = false;
    $scope.openDialog = function (oldValue) {
        $scope.dialogValue = focused.attr("text");
        $scope.$apply(function () {
            $scope.dialogShow = true;
        });
    };
    $scope.submitChange = function () {
        $scope.dialogShow = false;
        focused.attr("text", this.dialogValue);
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