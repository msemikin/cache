'use strict';
angular.module('db').service('Object', ['DataLoader', function(DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/objects',
        requestProp: 'object'
    });
}]);
