'use strict';
angular.module('db').service('Statistic', ['DataLoader', function (DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/statistics',
        requestProp: 'statistic'
    });
}]);
