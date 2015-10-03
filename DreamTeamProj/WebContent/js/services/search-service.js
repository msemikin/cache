'use strict';
angular.module('db').service('Search', ['DataLoader', function(DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/informational_requirements/searches',
        requestProp: 'search'
    });
}]);
