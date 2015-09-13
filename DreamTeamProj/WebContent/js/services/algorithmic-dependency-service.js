'use strict';
angular.module('db').service('AlgorithmicDependency', ['DataLoader', function (DataLoader) {
    return DataLoader.extend(0, {
        basicPath: 'project/algorithmic_dependencies/',
        requestProp: 'dependency'
    });
}]);
