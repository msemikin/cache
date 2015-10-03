'use strict';
angular.module('db').service('Sort', ['DataLoader', function(DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/informational_requirements/sorts',
        requestProp: 'sort'
    });
}]);
