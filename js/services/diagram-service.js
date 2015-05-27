var diagrams = {
	useCase: undefined,
	ER: undefined,
	objectRelation: undefined
};
var app = angular.module('cache');

app.service('diagramService', [function(){
	
	var self = {};	

    joint.shapes.basic.Actor = joint.shapes.basic.Generic.extend({
        markup: 
        '<svg contentScriptType="text/ecmascript" contentStyleType="text/css" height="127.0px" preserveAspectRatio="xMidYMid meet" version="1.0" width="62" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" zoomAndPan="magnify">
            <!--A UML Actor, as split elements -->
            <g class="uml.actor scalable" transform="translate(10 10)">
                <circle cx="20" cy="20" fill="#fcfcfc" r="20" stroke="#000000" stroke-dasharray="none" stroke-width="2"></circle>
                <line fill="#fcfcfc" stroke="#000000" stroke-dasharray="none" stroke-width="2" x1="20" x2="20" y1="40" y2="75"></line>
                <line fill="#fcfcfc" stroke="#000000" stroke-dasharray="none" stroke-width="2" x1="20" x2="0" y1="75" y2="105.0"></line>
                <line fill="#fcfcfc" stroke="#000000" stroke-dasharray="none" stroke-width="2" x1="20" x2="40" y1="75" y2="105.0"></line>
                <line fill="#fcfcfc" stroke="#000000" stroke-dasharray="none" stroke-width="2" x1="2" x2="38" y1="60.0" y2="60.0"></line>
            </g>
            <!--A UML Actor, as a single path -->
            <!--Change stroke and fill to a valid colour when using" -->
            <path fill="none" stroke="none" stroke-dasharray="none" stroke-width="2" d="M40 20 C40 31.0457 31.0457 40 20 40 C8.9543 40 0 31.0457 0 20 C0 8.9543 8.9543 0 20 0 C31.0457 0 40 8.9543 40 20 ZM20 40 L20 75M20 75 L0 105M20 75 L40 105M2 60 L38 60"></path>
        </svg>',

        defaults: joint.util.deepSupplement({
        
            type: 'basic.Actor',
            attrs: {
                'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle' }
            }
            
        }, joint.shapes.basic.Generic.prototype.defaults)

    });
    self.actor = new joint.shapes.basic.Actor({
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
