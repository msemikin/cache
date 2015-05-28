var app = angular.module('cache');
app.service('dragAndDropService',[function(){
	return function(sourceSelector, diagramSelector, jointObject, diagramGraph, figure){

		var dragMode = false;
		var dragSelector = '.transfer';
		var $drag = undefined;
		var lastX = undefined;
		var lastY = undefined
		var dragDiv = '<div class="transfer"></div>';

		function reset(){
			dragMode = false;
			$drag.remove();
		}

		$(sourceSelector).mousedown(function(eventData) {
			$(diagramSelector).prepend(dragDiv);
			$drag= $(dragSelector);

			var sourcePos = $(this).position();

			$drag.css({
				top: sourcePos.top,
				left: sourcePos.left
			});

			lastX = eventData.pageX;
			lastY = eventData.pageY;
			dragMode = true;
		});

		$(diagramSelector).mousemove(function(eventData){
			if(dragMode){
				var deltaX = eventData.pageX - lastX
				var deltaY = eventData.pageY - lastY

				$drag.css('top', '+='+deltaY);
				$drag.css('left', '+='+deltaX);

				lastX = eventData.pageX;
				lastY = eventData.pageY;
			}
		});

		$(diagramSelector).mouseup(function(eventData) {
			if(dragMode){
				reset();
				figure.set(
					'position', {
					    x: parseInt($drag.css('left')) - 20,
					    y: parseInt($drag.css('top')) - 135
					}
				);
				diagramGraph.addCell(figure.clone());
                console.log(paper);
			}
		});

	};
}]);
