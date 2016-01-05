'use strict';
angular.module('db').service('Report', ['DataLoader', function (DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/reports',
        requestProp: 'reports'
    });
}]);
