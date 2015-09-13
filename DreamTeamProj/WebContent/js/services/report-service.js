'use strict';
angular.module('db').service('Report', ['DataLoader', function (DataLoader) {
    return DataLoader.extend(0, {
        basicPath: 'project/reports/',
        requestProp: 'reports'
    });
}]);
