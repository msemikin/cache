'use strict';
angular.module('db').directive('documentViewer', function () {
    return {
        link: function (scope, element, attrs) {
            element.load(function () {
                element.contents()
                .find('#openFile')
                .click(function () {
                    console.log('CLICKED');
                });
            });

        }
    };
});