'use strict';
angular.module("db", [
    'ui.router',
    'angular-ladda',
    'ngMessages',
    'validation.match',
    'ui.bootstrap',
    'restangular',
    'monospaced.elastic',
    'ngAnimate',
    'ngDragDrop',
    'pdf'
]).config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
}).run(function($state, AuthService, Restangular, Config, $rootScope) {
    AuthService.authenticate();
    Restangular.setBaseUrl(Config.API_PATH.slice(0, Config.API_PATH.length - 1));
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
        if (to.redirectTo) {
            evt.preventDefault();
            $state.go(to.redirectTo, params);
        };
    })
});
