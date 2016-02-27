'use strict';
angular.module('db').service('ProjectModal', function ($uibModal) {
    return {
        createProject: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modals/project-modal.html',
                controller: function($scope, $uibModalInstance, Restangular, ErrorModal) {
                    $scope.project = {
                        title: '',
                        description: ''
                    };

                    $scope.create = function () {
                        $scope.creating = true;
                        return Restangular.all('projects').post($scope.project)
                            .then(function() {
                                $scope.creating = false;
                                $uibModalInstance.close();
                            })
                            .catch(function(err) {
                                $scope.creating = false;
                                ErrorModal.showError('Error creating project');
                            });
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };

                    $scope.hasErrors = function(field) {
                        var field = $scope.projectForm[field];
                        return field.$touched && !field.$valid;
                    };
                }
            });
            return modalInstance;
        }
    };
});
