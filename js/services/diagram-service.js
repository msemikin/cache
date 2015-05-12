var app = angular.module('cache');
app.service('diagramService', [function(){
	
	var self = {};	
	
    self.actor = new joint.shapes.basic.Circle({
		size: {
			width: 40,
			height: 40
		}
    }).attr({
		text: {
			text: 'Actor'
		}
    });

    self.service = new joint.shapes.basic.Circle({
		size: {
			width: 100,
			height: 40
		}
    }).attr({
	text: {
	    text: 'Service'
	}
    });

	return self;
}]);
