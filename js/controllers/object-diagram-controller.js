var app = angular.module("cache");

app.controller("ObjectDiagramController",['$scope', function($scope) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
            el: $('#object-relation-model'),
            gridSize: 10,
            model: graph,
    })
    

    var focused = undefined;

    // dbl-click
    paper.on("cell:pointerdblclick", function(cellView, evt, x, y) {
        if(cellView.model.attributes.type === 'link'){
            console.log(cellView.model.attributes);	
            $scope.linkLabel = cellView.model.attributes.labels[0].attrs.text.text;
			focused = cellView;
            $scope.openLinkOptions();            
        } // clicked on object
        else {
            $scope.renameValue = cellView.model.attributes.attrs.text.text;
            $scope.openObjectOptions();
        }
        focused = cellView;
    });

    paper.on('cell:pointerup', function(cellView, evt, x, y) {
        // Find the first element below that is not a link nor the dragged element itself.
        var elementBelow = graph.get('cells').find(function(cell) {
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
            },
            },
            labels: [
            { position: .5, attrs: { text: { text: 'label' } } }
            ]
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

    $scope.initActor = function() {
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
    $scope.initService = function() {
        var rect = new joint.shapes.basic.Circle({
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
    $scope.initObject = function() {
        var ellipse  = new joint.shapes.basic.Circle({
            position: {
                x: 100,
                y: 100
            },
            size: {
                width: 100,
                height: 40
            }
        })
        ellipse.attr({
            text: {
                text: 'Empty'
            }
        });
        graph.addCell(ellipse);
    };
	// link options	
    $scope.linkLabel = undefined;
    $scope.linkOptionsShow = false;

    $scope.openLinkOptions = function(){
        console.log(this.linkLabel);
        $scope.$apply(function(){
            $scope.linkOptionsShow = true;
        });
    };

    $scope.submitLinkChange = function(){
		focused.model.label(0, {attrs:{text: {text:this.linkLabel}}});
		$scope.linkOptionsShow = false;
	};
    $scope.cancelLinkChange = function(){
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
            rect: {
                width: width
            },
            text: {
                text: $scope.renameValue
            }
        });
    };
    $scope.cancelRename = function () {
        $scope.renameShow = false;
    };



}]);
