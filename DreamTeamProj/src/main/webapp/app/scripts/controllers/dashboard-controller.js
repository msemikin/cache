'use strict';
angular.module('db').controller('DashboardCtrl', function ($scope, Restangular, ProjectModal, ConfirmModal) {
    var baseProjects = Restangular.all('projects');
    $scope.loadingProjects = true;

    function reloadProjects() {
        $scope.loadingProjects = true;
        baseProjects.getList().then(function (projects) {
            $scope.projects = projects;
            $scope.loadingProjects = false;
        });
    }

    reloadProjects();

    $scope.createProject = function () {
        ProjectModal.createProject().result.then(reloadProjects);
    };

    function editProject(project) {
        ProjectModal.editProject(project).result.then(reloadProjects);
    }

    function removeProject(project) {
        ConfirmModal.show('Are you sure you want to remove this project?')
            .result.then(function () {
                project.remove().then(reloadProjects);
            });
    }

    $scope.editProject = dontPropagateDecorator(editProject);
    $scope.removeProject = dontPropagateDecorator(removeProject);

    function dontPropagateDecorator(func) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var $event = args[0];
            $event.stopPropagation();
            return func.apply(null, args.slice(1));
        };
    }
});

