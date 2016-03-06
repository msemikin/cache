'use strict';
angular.module('db').service('ConfirmModal', function ($uibModal) {
    return {
        show: function(message) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'modals/confirm-modal.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.message = message;

                    $scope.yes = function () {
                        $uibModalInstance.close();
                    };

                    $scope.no = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'sm'
            });
        }
    };
});