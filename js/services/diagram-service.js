var diagrams = {
	useCase: undefined,
	ER: undefined,
	objectRelation: undefined
};
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
    
    self.object = new joint.shapes.basic.Circle({
            position: {
                x: 100,
                y: 100
            },
            size: {
                width: 100,
                height: 40
            }
    }).attr({
        text: {
            text: 'Object'
        }
    });
    
    self.attribute = new joint.shapes.basic.Circle({
            size: {
                width: 100,
                height: 40
            }
        }).attr({
            text: {
                text: 'Attribute'
            }
        });
    
    self.entity = new joint.shapes.basic.Rect({
            size: {
                width: 80,
                height: 40
            }
        }).attr({
            text: {
                text: 'Entity'
            }
        });
    
    self.association = new joint.shapes.basic.Rhombus({
            size: {
                width: 100,
                height: 40
            }
        }).attr({
            text: {
                text: 'Association'
            }
        });
    
    
	return self;
    
}]);
