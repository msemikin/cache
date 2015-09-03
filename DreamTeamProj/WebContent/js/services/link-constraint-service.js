'use strict';
angular.module('db').service('LinkConstraint', ['DataLoader', function (DataLoader) {
    return DataLoader.extend(0, {
        basicPath: '/DreamTeamProj/project/integrity_constraints/links/',
        requestProp: 'constraint'
    });
}]);
