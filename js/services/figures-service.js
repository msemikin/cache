'use strict';
/*globals joint:true */
var app = angular.module('cache');

app.service('Figures', [function() {

    var figures = {};

    joint.shapes.cache = {};
    joint.shapes.cache.Service = joint.shapes.basic.Circle.extend({
        defaults: joint.util.deepSupplement({
            type: 'cache.Service',
            attrs: {
                rect: {
                    stroke: 'none',
                    'fill-opacity': 0
                }
            }
        }, joint.shapes.basic.Circle.prototype.defaults)
    });
    joint.shapes.cache.ServiceView = joint.dia.ElementView.extend({

        template: [
            '<div class="figure">',
            '<button class="action action--delete">x</button>',
            '<button class="action action--connect">&#8614;</button>',
            '<input type="text" class="input--rename">',
            '<label></label>',
            '</div>'
        ].join(''),

        initialize: function() {
            _.bindAll(this, 'updateBox');
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);

            this.$box = $(_.template(this.template)());

            // This is an example of reacting on the input change and storing the input data in the cell model.
            this.$box.find('.action--delete').on('click', _.bind(this.model.remove, this.model));
            // Prevent paper from handling pointerdown.
            this.$box.find('input').on('mousedown click', function(evt) {
                evt.stopPropagation();
            });

            var self = this;
            this.$box.find('.input--rename').keypress(function(e) {
                // clicked enter
                if (e.which === 13) {
                    var text = $(this).val(),
                        symbolLength = 7,
                        width = symbolLength * text.length + 80;

                    text = text.toLowerCase();
                    text = text[0].toUpperCase() + text.slice(1);

                    self.model.attr({
                        text: {
                            text: text
                        }
                    });
                    self.model.prop('renaming', false);
                    self.model.resize(width, 40);
                    return false;
                }
            });
            // Update the box position whenever the underlying model changes.
            this.model.on('change', this.updateBox, this);
            // Remove the box when the model gets removed from the graph.
            this.model.on('remove', this.removeBox, this);

            this.updateBox();
        },
        render: function() {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.paper.$el.prepend(this.$box);
            this.updateBox();
            return this;
        },
        updateBox: function() {
            // Set the position and dimension of the box so that it covers the JointJS element.
            var bbox = this.model.getBBox();
            // Example of updating the HTML with a data stored in the cell model.
            this.$box.css({
                width: bbox.width + 10,
                height: bbox.height + 10,
                left: bbox.x - 5,
                top: bbox.y - 5,
                transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
            });
            this.$box.find('.action--connect').css({
                left: bbox.width + 12
            });
            if (this.model.prop('selected')) {
                this.$box.addClass('selected');
            } else {
                this.$box.removeClass('selected');
            }
            if (this.model.prop('renaming')) {
                this.$box.addClass('renaming');
                this.$box.find('.input--rename').focus();
            } else {
                this.$box.removeClass('renaming');
            }
        },
        removeBox: function() {
            this.$box.remove();
        }
    });
    joint.shapes.cache.Actor = joint.shapes.basic.Generic.extend({
        markup: '<g class="scalable" transform="translate(10 10)">' +
            '<path xmlns="http://www.w3.org/2000/svg" fill="white" stroke="black" stroke-dasharray="none" stroke-width="2" d="M40 20 C40 31.0457 31.0457 40 20 40 C8.9543 40 0 31.0457 0 20 C0 8.9543 8.9543 0 20 0 C31.0457 0 40 8.9543 40 20 ZM20 40 L20 75M20 75 L0 105M20 75 L40 105M2 60 L38 60"/>' +
            '</g>' +
            '<g class="scalable"><text fill="black">I love SVG!</text></g>',

        defaults: joint.util.deepSupplement({

            type: 'cache.Actor',
            attrs: {
                'text': {
                    'font-size': 14,
                    'ref-x': .5,
                    'ref-y': 45,
                    ref: 'path',
                    'y-alignment': 'middle',
                    'x-alignment': 'middle'
                }
            }

        }, joint.shapes.basic.Generic.prototype.defaults)

    });
    joint.shapes.cache.ActorView = joint.dia.ElementView.extend({

        template: [
            '<div class="figure figure--actor">',
            '<button class="action action--delete">x</button>',
            '<button class="action action--connect">&#8614;</button>',
            '<input type="text" class="input--rename">',
            '<label></label>',
            '</div>'
        ].join(''),

        initialize: function() {
            _.bindAll(this, 'updateBox');
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);

            this.$box = $(_.template(this.template)());

            // This is an example of reacting on the input change and storing the input data in the cell model.
            this.$box.find('.action--delete').on('click', _.bind(this.model.remove, this.model));
            // Prevent paper from handling pointerdown.
            this.$box.find('input').on('mousedown click', function(evt) {
                evt.stopPropagation();
            });

            var self = this;
            this.$box.find('.input--rename').keypress(function(e) {
                // clicked enter
                if (e.which === 13) {
                    var text = $(this).val();

                    // formatting text
                    text = text.toLowerCase();
                    text = text[0].toUpperCase() + text.slice(1);

                    // inserting text into svg
                    self.model.attr({
                        text: {
                            text: text
                        }
                    });

                    // hiding the input
                    self.model.prop('renaming', false);
                    return false;
                }
            });
            // Update the box position whenever the underlying model changes.
            this.model.on('change', this.updateBox, this);
            // Remove the box when the model gets removed from the graph.
            this.model.on('remove', this.removeBox, this);

            this.updateBox();
        },
        render: function() {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.paper.$el.prepend(this.$box);
            this.updateBox();
            return this;
        },
        updateBox: function() {
            // Set the position and dimension of the box so that it covers the JointJS element.
            var bbox = this.getBBox();
            // Example of updating the HTML with a data stored in the cell model.
            this.$box.css({
                width: bbox.width + 10,
                height: bbox.height + 10,
                left: bbox.x - 5,
                top: bbox.y - 5,
                transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
            });
            this.$box.find('.action--connect').css({
                left: bbox.width + 12
            });
            if (this.model.prop('selected')) {
                this.$box.addClass('selected');
            } else {
                this.$box.removeClass('selected');
            }
            if (this.model.prop('renaming')) {
                this.$box.addClass('renaming');
                this.$box.find('.input--rename').focus();
            } else {
                this.$box.removeClass('renaming');
            }
        },
        removeBox: function() {
            this.$box.remove();
        }
    });



    // predefining figures
    figures.Actor = new joint.shapes.cache.Actor({
        size: {
            width: 25,
            height: 60
        }
    }).attr({
        text: {
            text: 'Actor'
        }
    });



    figures.Service = new joint.shapes.cache.Service({
        size: {
            width: 100,
            height: 40
        }
    }).attr({
        text: {
            text: 'Service'
        }
    });

    figures.Object = new joint.shapes.basic.Circle({
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

    figures.Attribute = new joint.shapes.basic.Circle({
        size: {
            width: 100,
            height: 40
        }
    }).attr({
        text: {
            text: 'Attribute'
        }
    });

    figures.Entity = new joint.shapes.basic.Rect({
        size: {
            width: 80,
            height: 40
        }
    }).attr({
        text: {
            text: 'Entity'
        }
    });

    figures.Association = new joint.shapes.basic.Rhombus({
        size: {
            width: 100,
            height: 40
        }
    }).attr({
        text: {
            text: 'Association'
        }
    });

    return {
        createFigure: function(type, position) {
            var figure = figures[type].clone();

            figure.set(
                'position', position
            );

            return figure;
        }
    };

}]);
