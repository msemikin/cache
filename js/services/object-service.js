'use strict';
angular.module('cache').service('Object', ['DataLoader', function (DataLoader) {
    return DataLoader.extend();
}]);
