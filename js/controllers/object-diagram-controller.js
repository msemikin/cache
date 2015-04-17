var app = angular.module("cache");

app.controller("objectDiagramController",['$scope', function($scope) {
    var graphs = [new joint.dia.Graph, new joint.dia.Graph];
    
    var funcSize = $('.functional-model').css(['width', 'height']);
    var objSize = $('.object-relation-model').css(['width', 'height']);
    var headerHeight = $('.panel-heading').css('height');

    var formatSize = function(value){
	return value.slice(0, value.length - 2);
    }
    funcSize.height = (formatSize(funcSize.height) - formatSize(headerHeight)).toString()+'px';
    objSize.height = (formatSize(objSize.height) - formatSize(headerHeight)).toString()+'px';
console.log(funcSize.height);
    var papers = [
        new joint.dia.Paper({
            el: $('#functional-model'),
            gridSize: 10,
            model: graphs[0],
	    width: formatSize(funcSize.width),
	    height: formatSize(funcSize.height)
        }),
        new joint.dia.Paper({
            el: $('#object-relation-model'),
            gridSize: 10,
            model: graphs[1],
	    width: formatSize(objSize.width),
	    height: formatSize(objSize.height)
        })
    ];

    var focused = undefined;

    for (var i = 0; i < papers.length; i++) {
        // dbl-click
        papers[i].on("cell:pointerdblclick", function(cellView, evt, x, y) {
            $scope.renameValue = cellView.model.attributes.attrs.text.text;
            console.log(cellView.model.attributes);
            $scope.openOptions();
            focused = cellView;
        });
        // connecting
	(function(i){
		papers[i].on('cell:pointerup', function(cellView, evt, x, y) {
		    var graph = graphs[i];
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
				}
			    }
			}));
			// Move the element a bit to the side.
			cellView.model.translate(100, 100);
		    }
		});
	})(i);
    };
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
        graphs[0].addCell(ell);
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
        graphs[0].addCell(rect);
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
        graphs[1].addCell(ellipse);
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

    //То самое удаление
    $scope.deleteObj = function() {
        $scope.optionsShow = false;
        focused.remove();
    }

    $scope.renameValue = undefined;
    $scope.renameShow = false;
    $scope.renameObj = function() {
        $scope.optionsShow = false;
        $scope.renameShow = true;
    };
    $scope.submitChange = function() {
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
    $scope.cancelChange = function() {
        $scope.renameShow = false;
    };



}]);
