'use strict';
angular.module('db').service('Link', ['DataLoader', function(DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/links',
        requestProp: 'link'
    });
}]);
