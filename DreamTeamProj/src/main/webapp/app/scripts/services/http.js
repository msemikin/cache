'use strict';
angular.module('db').service('http', function($http, Config) {
    return {
        post: function(path, data) {
            return $http.post(Config.API_PATH + path, data);
        },
        get: function(path, data) {
            return $http.get(Config.API_PATH + path, data);
        }
    };
});