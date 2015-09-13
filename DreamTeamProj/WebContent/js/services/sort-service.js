'use strict';
angular.module('db').service('Sort', ['DataLoader', function(DataLoader) {
    return DataLoader.extend(0, {
        basicPath: 'project/informational_requirements/sorts/',
        requestProp: 'sort'
    });
}]);
