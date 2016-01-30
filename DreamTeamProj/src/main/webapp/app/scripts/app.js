'use strict';
angular.module("db", [
    'ui.router',
    'angular-ladda',
    'ngMessages'
]).config(function($stateProvider) {
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'states/register.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'states/login.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'states/project.html'
        })
        .state('project', {
            url: '/projects/:id',
            templateUrl: 'states/project.html'
        })
        .state('project.document', {
            url: '/projects/:id/document',
            templateUrl: 'templates/document.html'
        })
        .state('project.useCase', {
            url: '/projects/:id/use-case',
            templateUrl: 'templates/use-case.html'
        })
        .state('project.objectRelations', {
            url: '/projects/:id/object-relations',
            templateUrl: 'templates/object-relations.html'
        })
        .state('project.er', {
            url: '/projects/:id/er',
            templateUrl: 'templates/er.html'
        })
        .state('project.informationalRequirements', {
            url: '/projects/:id/informational-requirements',
            templateUrl: 'templates/informational-requirements.html'
        })
        .state('project.statistics', {
            url: '/projects/:id/statistics',
            templateUrl: 'templates/statistics.html'
        })
        .state('project.reports', {
            url: '/projects/:id/reports',
            templateUrl: 'templates/reports.html'
        })
        .state('project.algorithmicDependencies', {
            url: '/projects/:id/algorithmic-dependencies',
            templateUrl: 'templates/algorithmic-dependencies.html'
        })
        .state('project.integrityConstraints', {
            url: '/projects/:id/integrityConstraints',
            templateUrl: 'templates/integrity-constraints.html'
        });
}).run(function($state) {
    $state.go('login');
});
