'use strict';
angular.module("db", [
    'ui.router',
    'angular-ladda',
    'ngMessages',
    'validation.match'
]).run(function($state, AuthService) {
    AuthService.authenticate();
});
