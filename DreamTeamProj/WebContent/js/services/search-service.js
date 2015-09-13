'use strict';
angular.module('db').service('Search', ['DataLoader', function(DataLoader) {
    return DataLoader.extend(0, {
        basicPath: 'project/informational_requirements/searches/',
        requestProp: 'search'
    });
}]);
