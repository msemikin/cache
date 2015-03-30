var app = angular.module("cache", []);
app.controller("drawController", function ($scope) {
    var snap = Snap("#canvas");

    var figures = [];
    var focused = undefined;
    $scope.initEntity = function () {
        var rect = snap.rect(50, 50, 100, 50);
        var text = snap.text(77, 77, "Empty");
        figure = snap.group(rect, text);
        figure.drag(move, start, up);
        rect.attr(style);
        text.attr({
            'text-anchor': 'start'
        });
        text.dblclick(processText);
        figures.push(figure);
    };
    $scope.initAttribute = function () {
        var rect = snap.ellipse(50, 50, 50, 25);
        var text = snap.text(50, 50, "Empty");
        figure = snap.group(rect, text);
        figure.drag(move, start, up);
        rect.attr(style);
        text.attr({
            'text-anchor': 'start'
        });
        text.dblclick(processText);
        figures.push(figure);
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




    var style = {
        fill: "white",
        stroke: "black",
        strokeWidth: 2
    };
    var focusStyle = {
        strokeWidth: 4
    };
    var unfocusedStyle = {
        strokeWidth: 2
    };

    var start = function () {
        focus(this);
        this.data("oldt", this.transform().string);
    };
    var move = function (dx, dy) {
        var values = parseCoord(this.data("oldt"));
        oldx = parseInt(values[0]);
        oldy = parseInt(values[1]);
        var newDx = dx + oldx;
        var newDy = dy + oldy;
        this.transform("t" + newDx + "," + newDy);
    };
    var up = function () {};
    var focus = function (element) {
        if (focused) {
            focused.attr(unfocusedStyle);
        }
        element.attr(focusStyle);
        focused = element;
    }

    var processText = function () {
        focus(this);
        $scope.openDialog();
        console.log("aa");
    };

    // <- [x, y]
    var parseCoord = function (transform) {
        var values = transform.split(/[t,]/).filter(function (el, index, arr) {
            return el ? true : false;
        });
        values[0] = parseInt(values[0] || 0);
        values[1] = parseInt(values[1] || 0);
        return values;
    };



});
