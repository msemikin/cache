'use strict';
angular.module('db').service('Attribute', ['DataLoader', function (DataLoader) {
    return DataLoader.extend(0, {
        basicPath: 'project/attribute/',
        requestProp: 'attribute'
    });
}]);
