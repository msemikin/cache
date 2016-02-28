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
                    $scope.mode = 'create';

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
        },
        editProject: function (project) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'modals/project-modal.html',
                controller: function($scope, $uibModalInstance, Restangular, ErrorModal) {
                    $scope.project = project;
                    $scope.mode = 'edit';

                    $scope.update = function () {
                        $scope.updating = true;
                        return $scope.project.put()
                            .then(function() {
                                $uibModalInstance.close();
                            })
                            .catch(function(err) {
                                ErrorModal.showError('Error creating project');
                            })
                            .finally(function () {
                                $scope.creating = false;
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
        }
    };
});
