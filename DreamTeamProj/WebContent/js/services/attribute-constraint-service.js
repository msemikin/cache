'use strict';
angular.module('db').service('AttributeConstraint', ['DataLoader', function (DataLoader) {
    return DataLoader.extend({
        basicPath: 'project/integrity_constraints/attributes',
        requestProp: 'constraint'
    });
}]);
