'use strict';
angular.module('db').directive('fileread', function() {
    return {
        scope: {
            fileread: '='
        },
        link: function(scope, element, attrs) {
            element.bind('change', function(changeEvent) {
                var reader = new FileReader(),
                    file = changeEvent.target.files[0];
                reader.onload = (function(fileObj) {
                    return function (loadEvent) {
                        scope.$apply(function() {
                            scope.fileread = {
                                name: fileObj.name,
                                src: loadEvent.target
                            };
                        });
                    };
                }(file));
                reader.readAsDataURL(file);
            });
        }
    };
});
