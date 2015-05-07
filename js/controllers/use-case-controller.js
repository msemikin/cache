var app = angular.module('cache');
app.controller('UseCaseController',['$scope', function($scope){
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#functional-model'),
        gridSize: 10,
        model: graph,
    })

    var focused = undefined;
    var linkmode = false;
    var drag = undefined;
	var link = undefined;
	var deltaX = 100; // for random creating
	var deltaY = 100;

    // dbl-click
    paper.on("cell:pointerdblclick", function(cellView, evt, x, y) {
        $scope.renameValue = cellView.model.attributes.attrs.text.text;
        $scope.openOptions();
        focused = cellView;
    });

	
	paper.on('cell:pointerclick',function(cellView, evt, x, y){
		removeDrag();
		if(cellView.model.prop('type') !== 'drag' && !linkmode){
			var position = cellView.model.attributes.position;
			var size = cellView.model.attributes.size;
			var dragger = new joint.shapes.basic.Circle({
				position: {
					x:position.x + size.width + 5,
					y:position.y + (size.height /2 - 5)
				},
				size: {
					width: 10,
					height: 10
				}
			});
			dragger.prop('type', 'drag');
			drag = dragger;		
			graph.addCell(dragger);
			focused = cellView;
		}
	});

	paper.on('cell:pointerdown', function(cellView, evt, x, y){
		if(cellView.model.prop('type') === 'drag' && !linkmode){
			removeDrag();
			linkmode = true;	
			link = new joint.dia.Link({
				source: {
					id: focused.model.id
				},
				target: {
					x: x,
					y: y
				},
				attrs: {
					'.connection': {
					d: 'M 10 0 L 0 5 L 10 10 z'
					}
				},
				/*labels: [ 
					{ position: 15, attrs: { text: { text: '1' } }},
					{ position: -15, attrs: { text: { text: '1' } }},
				]*/
			});
			graph.addCell(link);
		}
	});

	paper.on('cell:pointermove', function(cellView, evt, x, y){
		if(linkmode){
			link.set('target',{x:x, y:y});
		}
	});

	paper.on('cell:pointerup', function(cellView, evt, x, y){
		if(linkmode){
			var elementBelow = graph.get('cells').find(function(cell) {
				if (cell instanceof joint.dia.Link) return false; // Not interested in links.
				if (cell.id === cellView.model.id) return false; // The same element as the dropped one.
				if (cell.getBBox().containsPoint(g.point(x, y))) {
					return true;
				}
				return false;
			});
			if (elementBelow && !_.contains(graph.getNeighbors(elementBelow), focused.model)) {
				link.set('target', {id: elementBelow.id});
			} else {
				link.remove();		
			}


			linkmode = false;
			link = undefined;
			focused = undefined;
		}
	});

	paper.on('blank:pointerclick', removeDrag);

	function removeDrag(){
		if(drag){
			drag.remove();
			drag = undefined;
		}
	}
    
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
                x: 200,
                y: 200
            },
            size: {
                width: 40,
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
        var circle = new joint.shapes.basic.Circle({
            position: {
                x: 100,
                y: 100
            },
            size: {
                width: 100,
                height: 40
            }
        })
        circle.attr({
            text: {
                text: 'Empty'
            }
        });
        graph.addCell(circle);
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

    $scope.deleteObj = function() {
        $scope.optionsShow = false;
        focused.remove();
		focused = undefined;
		removeDrag();
    }

    $scope.renameValue = undefined;
    $scope.renameShow = false;
    $scope.renameObj = function() {
        $scope.optionsShow = false;
        $scope.renameShow = true;
    };
    $scope.submitChange = function() {
        var symbolLength = 7;
        var width = symbolLength * $scope.renameValue.length + 80;
        $scope.renameValue = $scope.renameValue.toLowerCase();
        $scope.renameValue = $scope.renameValue[0].toUpperCase() + $scope.renameValue.substr(1, $scope.renameValue.length);
        $scope.renameShow = false;
	console.log(focused);
        focused.model.attr({
            text: {
                text: $scope.renameValue
            }
        });
	focused.model.resize(width, 40);

    };
    $scope.cancelChange = function() {
        $scope.renameShow = false;
    };

}]);
