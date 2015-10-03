'use strict';
angular.module('db').service('Filter', ['DataLoader', function(DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/informational_requirements/filters',
        requestProp: 'filter'
    });
}]);
