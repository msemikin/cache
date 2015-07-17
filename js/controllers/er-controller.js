var app = angular.module("cache");
var objD = new Array();

app.controller("ERController", ['$scope', 'diagramService', 'dragAndDropService', 'linkManipulationService', function ($scope, diagram, dragAndDrop, linkManipulation) {

    console.log("ER");
        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({
            el: $('#er-model'),
            gridSize: 10,
            width: '100%',
            height: 600,
            model: graph
        });
        diagrams.ER = graph;


        linkManipulation(graph, paper);
        dragAndDrop('.entity', '.er-model', undefined, graph, diagram.entity);
        dragAndDrop('.attribute', '.er-model', undefined, graph, diagram.attribute);
        dragAndDrop('.association', '.er-model', undefined, graph, diagram.association);

        var focused = undefined;

        // dbl-click
        paper.on("cell:pointerdblclick", function (cellView, evt, x, y) {
            // clicked on link
            if (cellView.model.attributes.type === 'link') {
                var vertices = cellView.model.get('vertices').reverse().slice(1);
                for (var i = 0; i < vertices.length; i++) {
                    if (vertices[i].x == x && vertices[i].y == y) {
                        vertices.splice(i, 1);
                    }
                }
                cellView.model.set('vertices', vertices);
                $scope.linkLabels = {};
                $scope.linkLabels.first = cellView.model.attributes.labels[0].attrs.text.text;
                $scope.linkLabels.second = cellView.model.attributes.labels[2].attrs.text.text;
                focused = cellView;
                $scope.openLinkOptions();
            } // clicked on object
            else {
                $scope.renameValue = cellView.model.attributes.attrs.text.text;
                $scope.openObjectOptions();
            }
            focused = cellView;
        });

        paper.on("cell:pointerup", function (cellView, evt, x, y) {
            if (cellView.model.attributes.type === "basic.Rect") {
                var obj = objects[findIndByObjName(cellView.model.attributes.attrs.text.text)];
                if (obj) {
                    obj.ERx = cellView.model.attributes.position.x;
                    obj.ERy = cellView.model.attributes.position.y;
                    obj.isEdited = true;
                }
            }
            return false;
        });

        $scope.updateER = function () {
            var models = diagrams.ER.attributes.cells.models;
            for (t = 0; t < models.length; t++) {
                if (models[t].attributes.type == "basic.Rect") {
                    var obj = objects[findIndByObjName(models[t].attributes.attrs.text.text)];
                    if (obj && !obj.isEdited) {
                        //models[t].attributes.position.x = obj.RelX;
                        //models[t].attributes.position.y = obj.RelY;
                        models[t].set(
                            'position', {
                                x: obj.RelX,
                                y: obj.RelY
                            }
                        );
                    }
                    //console.log(obj.x + " " + obj.y);
                }
            }
        };

        // editing link
        $scope.linkLabels = undefined;
        $scope.linkOptionsShow = false;

        $scope.openLinkOptions = function () {
            $scope.$apply(function () {
                $scope.linkOptionsShow = true;
            });
        };

        $scope.submitLinkChange = function () {
            console.log(focused.model.label);
            focused.model.label(0, {
                attrs: {
                    text: {
                        text: this.linkLabels.first
                    }
                }
            });
            focused.model.label(2, {
                attrs: {
                    text: {
                        text: this.linkLabels.second
                    }
                }
            });
            $scope.linkOptionsShow = false;
        };
        $scope.cancelLinkChange = function () {
            $scope.linkOptionsShow = false;
        };


        // editing object
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