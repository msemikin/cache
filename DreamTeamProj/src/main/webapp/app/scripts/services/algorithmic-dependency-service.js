'use strict';
angular.module('db').service('AlgorithmicDependency', ['DataLoader', function(DataLoader) {
    return $.extend(DataLoader.extend({
        basicPath: 'project/algorithmic_dependencies',
        requestProp: 'algorithmicDependency'
    }), {
        insertSourceField: function(dependency) {
            var self = this;
            var requestData = {
                projectId: 0,
                algorithmicDependency: JSON.stringify(dependency)
            }
            return $.post('project/algorithmic_dependencies/sourceFields/insert', requestData).then(function(response) {
                console.log(response);
                self.update(dependency)
            });
        }
    });
}]);
