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
                controller: 'ProjectCtrl',
                redirectTo: 'project.document',
                resolve: {
                    auth: auth,
                    project: function (Restangular, $stateParams) {
                        return Restangular.one('projects', $stateParams.id);
                    }
                }
            })
            .state('project.document', {
                url: '/document',
                templateUrl: 'templates/document.html',
            })
            .state('project.useCase', {
                url: '/use-case',
                templateUrl: 'templates/use-case.html'
            })
            .state('project.objectRelations', {
                url: '/object-relations',
                templateUrl: 'templates/object-relations.html'
            })
            .state('project.er', {
                url: '/er',
                templateUrl: 'templates/er.html'
            })
            .state('project.informationalRequirements', {
                url: '/informational-requirements',
                templateUrl: 'templates/informational-requirements.html'
            })
            .state('project.statistics', {
                url: '/statistics',
                templateUrl: 'templates/statistics.html'
            })
            .state('project.reports', {
                url: '/reports',
                templateUrl: 'templates/reports.html'
            })
            .state('project.algorithmicDependencies', {
                url: '/algorithmic-dependencies',
                templateUrl: 'templates/algorithmic-dependencies.html'
            })
            .state('project.integrityConstraints', {
                url: '/integrityConstraints',
                templateUrl: 'templates/integrity-constraints.html'
            });
    });
