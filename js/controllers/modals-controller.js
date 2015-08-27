'use strict';
angular.module('cache').controller('ModalsCtrl', function($scope, $rootScope, Modals) {
    var modal = null;

    $scope.handleClick = function () {
        Modals.reject();
    };

    $rootScope.on('modals.open', function (event, modalType) {
        $('#' + modalType).modal('show');
        modal = modalType;
    });

    $rootScope.on('modals.close', function () {
        $('#' + modal).modal('hide');
    });
});
