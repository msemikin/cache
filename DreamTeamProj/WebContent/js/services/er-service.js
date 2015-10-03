'use strict';
angular.module('db').service('ER', function(DiagramLoader) {
    return DiagramLoader.extend({
        basicPath: 'project/diagrams/er',
        requestProp: 'diagram'
    });
});
