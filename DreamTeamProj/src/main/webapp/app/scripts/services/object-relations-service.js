'use strict';
angular.module('db').service('ObjectRelations', function(DiagramLoader) {
    return DiagramLoader.extend({
        basicPath: 'project/diagrams/object_relations',
        requestProp: 'diagram'
    });
});
