var app = angular.module('cache');
app.service('linkManipulationService',[ function(){
	return function(graph, paper) {
		var linkDragMode = false;
		var linkDot = undefined;
		var link = undefined;
		var focusedView = undefined;

		function removeLinkDot() {
			if(linkDot){
				linkDot.remove();
				linkDot = undefined;
			}
		};

		function reset(){
			linkDragMode = false;
			link = undefined;
			focusedView = undefined;
		};

		// create linkDot
		paper.on('cell:pointerclick', function(cellView, evt, x, y){
			if(cellView.model.prop('type') !== 'drag' && !linkDragMode && !linkDot && (cellView.model.attributes.type !== 'link')){

				var position = cellView.model.attributes.position;
				var size = cellView.model.attributes.size;

				linkDot = new joint.shapes.basic.Circle({
					position: {
						x:position.x + size.width + 5,
						y:position.y + (size.height /2 - 5)
					},
					size: {
						width: 10,
						height: 10
					}
				});
				linkDot.prop('type', 'drag');

				graph.addCell(linkDot);
				focusedView = cellView;
			}
		});

		// create link
		paper.on('cell:pointerdown', function(cellView, evt, x, y){
			if(cellView.model.prop('type') === 'drag' && !linkDragMode){
				removeLinkDot();
				linkDragMode = true;	
				link = new joint.dia.Link({
					source: {
						id: focusedView.model.id
					},
					target: {
						x: x,
						y: y
					},
					attrs: {
						'.connection': {
						  d: 'M 10 0 L 0 5 L 10 10 z'
						},
                        '.marker-target': {},
                        '.marker-source': {}
					},
					labels: [ 
						{ position: +15, attrs: { text: { text: '' } }},
						{ position: .5, attrs: { text: { text: '' } }},
						{ position: -15, attrs: { text: { text: '' } }},
					]
				});
				graph.addCell(link);
			}
		});

		// move link
		paper.on('cell:pointermove', function(cellView, evt, x, y){
			if(linkDragMode){
				link.set('target',{x:x, y:y});
			}
		});

		// finish creating link
		paper.on('cell:pointerup', function(cellView, evt, x, y){
			if(linkDragMode){
				var elementBelow = graph.get('cells').find(function(cell) {
					if (cell instanceof joint.dia.Link) return false; // Not interested in links.
					if (cell.id === cellView.model.id) return false; // The same element as the dropped one.
					if (cell.getBBox().containsPoint(g.point(x, y))) {
						return true;
					}
					return false;
				});
				if (elementBelow && !_.contains(graph.getNeighbors(elementBelow), focusedView.model)) {
					link.set('target', {id: elementBelow.id});
				} else {
					link.remove();		
				}
				reset();
			}
		});
		
		paper.on('blank:pointerclick', removeLinkDot);

		paper.on("cell:pointerdblclick", removeLinkDot);

	};
}]);
