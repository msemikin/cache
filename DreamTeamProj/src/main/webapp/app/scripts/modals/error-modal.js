'use strict';
angular.module('db').service('ErrorModal', function ($uibModal) {
    return {
        showError: function(message) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modals/error-modal.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.message = message;

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'sm'
            });
        }
    };
});