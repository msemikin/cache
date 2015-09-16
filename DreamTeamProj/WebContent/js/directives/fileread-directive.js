'use strict';
angular.module('db').directive('fileread', function() {
    return {
        scope: {
            fileread: '='
        },
        link: function(scope, element, attrs) {
            element.bind('change', function(changeEvent) {
                var file = changeEvent.target.files[0];
                scope.$apply(function() {
                    scope.fileread = {
                        name: file.name,
                        file: file
                    };
                });
            });
        }
    };
});
