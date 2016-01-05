'use strict';
angular.module('db').controller('ModalsCtrl', function($scope, $rootScope, Modals) {
    var modal = null;

    $scope.handleClick = function () {
        Modals.reject();
    };

    $rootScope.$on('modals.show', function (event, modalType) {
        $('#' + modalType).modal('show');
        $rootScope.$emit('modals.show.' + modalType);
        modal = modalType;
    });

    $rootScope.$on('modals.close', function () {
        $('#' + modal).modal('hide');
    });
});
