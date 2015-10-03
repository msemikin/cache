'use strict';
angular.module('db').service('UseCase', function(DiagramLoader) {
    return DiagramLoader.extend({
        basicPath: 'project/diagrams/usecase',
        requestProp: 'diagram'
    });
});
