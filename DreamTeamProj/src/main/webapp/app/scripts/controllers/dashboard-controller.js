'use strict';
angular.module('db').controller('DashboardCtrl', function ($scope, Restangular, ProjectModal) {
    var baseProjects = Restangular.all('projects');
    $scope.loadingProjects = true;

    function updateProjects () {
        baseProjects.getList().then(function(projects) {
            $scope.projects = projects;
            $scope.loadingProjects = false;
        });
    }
    updateProjects();

    $scope.createProject = function() {
        ProjectModal.createProject().result.then(updateProjects);
    };

    function editProject (project) {
        ProjectModal.editProject(project).result.then(updateProjects);
    }

    $scope.editProject = dontPropagateDecorator(editProject);


    function dontPropagateDecorator(func) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var $event = args[0];
            $event.stopPropagation();
            return func.apply(null, args.slice(1));
        }
    }

});