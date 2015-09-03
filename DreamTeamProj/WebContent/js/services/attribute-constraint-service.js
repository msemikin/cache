'use strict';
angular.module('db').service('AttributeConstraint', ['DataLoader', function (DataLoader) {
    return DataLoader.extend(0, {
        basicPath: '/DreamTeamProj/project/integrity_constraints/attributes/',
        requestProp: 'constraint'
    });
}]);
