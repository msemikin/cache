'use strict';
angular.module('db').service('Object', ['DataLoader', function(DataLoader) {
    return DataLoader.extend(0, {
        basicPath: 'project/objects/',
        requestProp: 'object'
    });
}]);
