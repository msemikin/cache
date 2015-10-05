'use strict';
angular.module('db').service('LinkConstraint', ['DataLoader', function (DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/integrity_constraints/links',
        requestProp: 'constraint'
    });
}]);
