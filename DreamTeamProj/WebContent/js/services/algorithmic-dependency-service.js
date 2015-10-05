'use strict';
angular.module('db').service('AlgorithmicDependency', ['DataLoader', function (DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/algorithmic_dependencies',
        requestProp: 'algorithmicDependency'
    });
}]);
