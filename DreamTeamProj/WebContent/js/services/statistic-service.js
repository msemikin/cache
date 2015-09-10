'use strict';
angular.module('db').service('Statistic', ['DataLoader', function (DataLoader) {
    return DataLoader.extend(0, {
        basicPath: '/DreamTeamProj/project/statistics/',
        requestProp: 'statistic'
    });
}]);
