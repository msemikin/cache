'use strict';
angular.module('db').factory('DataLoader', function($q, $http, Config) {
    return {
        extend: function(params) {
            if (params) {
                var base = Config.API_PATH + params.basicPath;
                return {
                    paths: {
                        basePath: base,
                        loadPath: base + '/all',
                        createPath: base + '/new',
                        updatePath: base + '/update',
                        removePath: base + '/delete'
                    },
                    params: params,
                    create: function(value) {
                        var deferred = $q.defer();
                        var requestData = {
                            projectId: 0
                        };
                        value.projectId = 0;
                        requestData[params.requestProp] = JSON.stringify(value);
                        $.post(this.paths.createPath, requestData).then(function(response) {
                            deferred.resolve(JSON.parse(response));
                        });
                        return deferred.promise;
                    },
                    load: function() {
                        var deferred = $q.defer();
                        var requestData = {
                            projectId: 0
                        };
                        $.post(this.paths.loadPath, requestData).then(function(response) {
                            deferred.resolve(JSON.parse(response));
                        });
                        return deferred.promise;
                    },
                    update: function(value) {
                        var deferred = $q.defer();
                        var requestData = {
                            projectId: 0
                        };
                        requestData[params.requestProp] = JSON.stringify(value);
                        $.post(this.paths.updatePath, requestData).then(function(response) {
                            deferred.resolve(JSON.parse(response));
                        });
                        return deferred.promise;
                    },
                    delete: function(value) {
                        return $http.post(this.paths.removePath, {
                            id: value.id
                        });
                    }
                };
            }
        }
    };
});
