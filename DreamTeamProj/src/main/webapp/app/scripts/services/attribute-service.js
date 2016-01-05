'use strict';
angular.module('db').service('Attribute', ['DataLoader', function (DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/attribute/',
        requestProp: 'attribute'
    });
}]);
