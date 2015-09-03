'use strict';
angular.module('db').service('Filter', ['DataLoader', function(DataLoader) {
    return DataLoader.extend(0, {
        basicPath: '/DreamTeamProj/project/informational_requirements/filters/',
        requestProp: 'filter'
    });
}]);
