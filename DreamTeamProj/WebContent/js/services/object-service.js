'use strict';
angular.module('db').service('Object', ['DataLoader', function(DataLoader) {
    return DataLoader.extend(0, {
        basicPath: '/DreamTeamProj/project/objects/',
        requestProp: 'object'
    });
}]);
