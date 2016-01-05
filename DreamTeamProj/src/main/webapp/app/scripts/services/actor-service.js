'use strict';
angular.module('db').service('Actor', ['DataLoader', function (DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/actors',
        requestProp: 'actor'
    });
}]);
