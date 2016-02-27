'use strict';
angular.module("db", [
    'ui.router',
    'angular-ladda',
    'ngMessages',
    'validation.match',
    'ui.bootstrap',
    'restangular',
    'monospaced.elastic'
]).config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
}).run(function($state, AuthService, Restangular, Config) {
    AuthService.authenticate();
    Restangular.setBaseUrl(Config.API_PATH.slice(0, Config.API_PATH.length - 1));
});
