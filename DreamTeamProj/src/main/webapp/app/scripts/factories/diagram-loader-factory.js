'use strict';
angular.module('db').factory('DiagramLoader', function(DataLoader, $q) {
    return {
        extend: function(params) {
            var loader = DataLoader.extend(params);
            loader.paths.loadPath = loader.paths.basePath;
            loader.update = function(value, id) {
                var deferred = $q.defer();
                var requestData = {
                    diagramId: id
                };
                requestData[params.requestProp] = JSON.stringify(value);
                $.post(loader.paths.updatePath, requestData).then(function(response) {
                    deferred.resolve(JSON.parse(response));
                });
                return deferred.promise;
            };
            return loader;
        }
    };
});
