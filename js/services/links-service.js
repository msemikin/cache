'use strict';
/* globals joint g V:true */
var app = angular.module('cache');

app.service('Links', [function() {

    var links = {},
        abstract = {
            initialize: function() {
                _.bindAll(this, 'updateBox');
                joint.dia.LinkView.prototype.initialize.apply(this, arguments);

                this.$box = $(_.template(this.template)());
                this.$box.on('mouseover', _.bind(function() {
                    this.model.prop('hovered', true);
                }, this));
                this.$box.on('mouseout', _.bind(function() {
                    this.model.prop('hovered', false);
                }, this));
                // Prevent paper from handling pointerdown.
                this.$box.find('input,select,button').on('mousedown click', function(evt) {
                    evt.stopPropagation();
                });
                this.$box.find('select').on('change', _.bind(function(evt) {
                    this.model.set('select', $(evt.target).val());
                }, this));
                this.$box.find('.action--settings').on('click', _.bind(function() {
                    this.$box.addClass('changing-style');
                }, this));
                if (this.reverse) {
                    this.$box.find('.action--reverse').on('click', _.bind(this.reverse, this));
                }
                this.$box.find('select').val(this.model.get('select'));
                this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
                // Update the box position whenever the underlying model changes.
                this.model.on('change', this.updateBox, this);
                // Remove the box when the model gets removed from the graph.
                this.model.on('remove', this.removeBox, this);

                this.updateBox();
            },
            update: function () {
                joint.dia.LinkView.prototype.update.call(this);
                this.updateBox();
            },
            render: function() {
                joint.dia.LinkView.prototype.render.apply(this, arguments);
                this.paper.$el.prepend(this.$box);
                this.updateBox();
                return this;
            },
            updateBox: function() {
                if (this.model.prop('hovered')) {
                    this.$box.addClass('hovered');
                } else {
                    this.$box.removeClass('hovered');
                }
                var elementBox = {
                        width: this.$box.outerWidth(),
                        height: this.$box.outerHeight()
                    },
                    // we get the bounding box of the linkView without the transformations
                    bbox = g.rect(V(this.el).bbox(true)),
                    position = {
                        left: bbox.width / 2 + bbox.x - elementBox.width / 2,
                        top: bbox.y + bbox.height / 2 - elementBox.height / 2
                    };
                this.$box.css({
                    left: position.left,
                    top: position.top,
                    transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
                });
            },
            removeBox: function() {
                this.$box.remove();
            },
            setLabel: function(index, text) {
                this.model.label(index, {
                    attrs: {
                        text: {
                            text: text
                        }
                    }
                });
            }
        };

    links.UsecaseLinkView = joint.dia.LinkView.extend($.extend({}, abstract, {

        template: [
            '<div class="link-options">',
            '<button class="action action--reverse">&#8646;</button>',
            '<button class="action action--settings">&#9881;</button>',
            '<select class="form-control style-select">',
            '<option>Extend</option>',
            '<option>Include</option>',
            '<option>Association</option>',
            '</select>',
            '</div>'
        ].join(''),

        initialize: function() {
            abstract.initialize.call(this);
            this.$box.find('.style-select').on('change', _.bind(function() {
                var $select = this.$box.find('.style-select'),
                    linkType = $select.val();
                this.model.attr(links.usecaseLinkAttrs[linkType]);
                this.$box.removeClass('changing-style');
                this.setLabel(1, links.usecaseLinkLabels[linkType]);
            }, this));
        },
        reverse: function() {
            var source = this.model.attributes.attrs['.marker-source'];
            var target = this.model.attributes.attrs['.marker-target'];
            this.model.attr({
                '.marker-target': source,
                '.marker-source': target
            });
        }
    }));

    links.ObjectRelationsLinkView = joint.dia.LinkView.extend($.extend({}, abstract, {

        template: [
            '<div class="link-options object-relations-link">',
            '<input class="form-control input--rename">',
            '</div>'
        ].join(''),

        initialize: function() {
            abstract.initialize.call(this);
            var self = this;
            this.$box.find('.input--rename').keypress(function(e) {
                // clicked enter
                if (e.which === 13) {
                    var text = $(this).val();
                    self.model.label(1, {
                        attrs: {
                            text: {
                                text: text
                            }
                        }
                    });
                    self.model.prop('renaming', false);
                }
            });
        },
        updateBox: function() {
            abstract.updateBox.call(this);
            if (this.model.prop('renaming')) {
                this.$box.addClass('renaming');
                this.$box.find('.input--rename').focus();
            } else {
                this.$box.removeClass('renaming');
            }
        }
    }));

    links.ErLinkView = joint.dia.LinkView.extend($.extend({}, abstract, {

        template: [
            '<div class="link-options hidden">',
            '<button class="action action--reverse">&#8646;</button>',
            '<button class="action action--settings">&#9881;</button>',
            '<select class="form-control style-select">',
            '<option>-</option>',
            '<option>1 - 1</option>',
            '<option>M - 1</option>',
            '<option>M - M</option>',
            '</select>',
            '</div>'
        ].join(''),

        initialize: function() {
            abstract.initialize.call(this);
            this.$box.find('.style-select').on('change', _.bind(function() {
                var $select = this.$box.find('.style-select'),
                    linkLabels = $select.val().split('-');
                this.setLabel(0, linkLabels[0].trim());
                this.setLabel(2, linkLabels[1].trim());
                this.$box.removeClass('changing-style');
            }, this));
            this.model.on('change:source', _.bind(this.handleLinkEdges, this));
            this.model.on('change:target', _.bind(this.handleLinkEdges, this));
        },
        reverse: function() {
            var labels = $.map(this.model.get('labels'), function(value, index) {
                return value.attrs.text.text;
            });
            this.setLabel(0, labels[2]);
            this.setLabel(2, labels[0]);
        },
        handleLinkEdges: function (event, edge) {
            if (edge.id) {
                var element = this.paper.model.getCell(edge.id);
                if (element.attributes.type === 'cache.Attribute') {
                    this.$box.addClass('hidden');
                } else {
                    this.$box.removeClass('hidden');
                }
            }
        }
    }));

    links.usecaseLinkAttrs = {
        Association: {
            '.connection': {
                'stroke-dasharray': '0 0'
            }
        },
        Include: {
            '.connection': {
                'stroke-dasharray': '5 2'
            },
            '.marker-target': {
                d: 'M 10 0 L 0 5 L 10 10 z'
            },
            '.marker-source': {
                d: ''
            }
        },
        Extend: {
            '.connection': {
                'stroke-dasharray': '5 2'
            },
            '.marker-target': {
                d: 'M 10 0 L 0 5 L 10 10 z'
            },
            '.marker-source': {
                d: ''
            }
        }
    };

    links.usecaseLinkLabels = {
        Association: '',
        Include: '<include>',
        Extend: '<extend>'
    };

    links.params = {};
    links.params.default = {
        attrs: {
            '.connection': {
                d: 'M 10 0 L 0 5 L 10 10 z'
            },
            '.marker-target': {},
            '.marker-source': {}
        },
        labels: [{
            position: +15,
            attrs: {
                text: {
                    text: ''
                }
            }
        }, {
            position: .5,
            attrs: {
                text: {
                    text: ''
                }
            }
        }, {
            position: -15,
            attrs: {
                text: {
                    text: ''
                }
            }
        }]
    };

    return {
        getLinkView: function(name) {
            return links[name];
        },
        createLink: function(source, target) {
            var link = new joint.dia.Link(links.params.default);
            link.set('source', source);
            link.set('target', target);
            return link;
        }
    };
}]);
