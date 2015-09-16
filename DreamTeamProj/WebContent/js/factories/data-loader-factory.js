'use strict';
angular.module('db').factory('DataLoader', function($q, $http, Config) {
    function indexOf(data, value) {
        var index = _.findIndex(data, function(element) {
            return element.id === value.id;
        });
        return index;
    }

    return {
        extend: function(data, params) {
            var id = 0;
            if (params) {
                var base = Config.API_PATH + params.basicPath,
                    loadPath = base + '/all',
                    createPath = base + '/new',
                    updatePath = base + '/update',
                    removePath = base + '/delete';
                return {
                    create: function(value) {
                        var deferred = $q.defer();
                        var requestData = {
                            projectId: 0
                        };
                        value.projectId = 0;
                        requestData[params.requestProp] = JSON.stringify(value);
                        $.post(createPath, requestData).then(function(response) {
                            deferred.resolve(JSON.parse(response));
                        });
                        return deferred.promise;
                    },
                    load: function() {
                        var deferred = $q.defer();
                        var requestData = {
                            projectId: 0
                        };
                        $.post(loadPath, requestData).then(function(response) {
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
                        $.post(updatePath, requestData).then(function(response) {
                            deferred.resolve(JSON.parse(response));
                        });
                        return deferred.promise;
                    },
                    delete: function(value) {
                        return $http.post(removePath, {
                            id: value.id
                        });
                    }
                };
            }
            return {
                create: function(value) {
                    var deferred = $q.defer();
                    value.id = id++;
                    data.push(value);
                    deferred.resolve({
                        success: true,
                        id: value.id
                    });
                    return deferred.promise;
                },
                load: function() {
                    var deferred = $q.defer();
                    deferred.resolve(data);
                    return deferred.promise;
                },
                update: function(value) {
                    var deferred = $q.defer();
                    var index = indexOf(data, value);
                    data.splice(index, 1, value);
                    deferred.resolve({
                        success: true
                    });
                    return deferred.promise;
                },
                delete: function(value) {
                    var index = indexOf(data, value);
                    data.splice(index, 1, value);
                    return true;
                },
                get: function(id) {
                    console.log(id);
                    var deferred = $q.defer();
                    deferred.resolve(_.findWhere(data, {
                        id: id
                    }));
                    return deferred.promise;
                }
            };
        }
    };
});
