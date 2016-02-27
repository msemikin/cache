'use strict';
angular.module('db').controller('DashboardCtrl', function ($scope, Restangular, ProjectModal) {
    var baseProjects = Restangular.all('projects');
    $scope.loadingProjects = true;
    baseProjects.getList().then(function(projects) {
        $scope.projects = projects;
        $scope.loadingProjects = false;
    });

    $scope.createProject = function() {
        ProjectModal.createProject();
    };

});