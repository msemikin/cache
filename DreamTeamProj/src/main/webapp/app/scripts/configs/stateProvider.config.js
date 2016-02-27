'use strict';
angular.module('db')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");

        var notAuth = function(AuthService, $q, $state, $timeout) {
            var deferred = $q.defer();
            $timeout(function() {
                AuthService.authenticated()
                    .then(function() {
                        $state.go('dashboard');
                        deferred.reject();
                    }, function() {
                        deferred.resolve();
                    });
            });
            return deferred.promise;
        };
        var auth = function(AuthService, $q, $state, $timeout) {
            var deferred = $q.defer();
            $timeout(function() {
                AuthService.authenticated()
                    .then(function() {
                        deferred.resolve();
                    }, function() {
                        $state.go('login');
                        deferred.reject();
                    });
            });
            return deferred.promise;
        };

        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: 'states/register.html',
                resolve: {
                    notAuth: notAuth
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'states/login.html',
                resolve: {
                    notAuth: notAuth
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'states/dashboard.html',
                resolve: {
                    auth: auth
                }
            })
            .state('project', {
                url: '/projects/:id',
                templateUrl: 'states/project.html',
                resolve: {
                    auth: auth
                }
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
    });