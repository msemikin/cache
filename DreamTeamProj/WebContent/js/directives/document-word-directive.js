/**
 * Created by maxim on 04.10.15.
 */
'use strict';
angular.module('db').directive('documentWord', function () {
    return {
        scope: {
            id: '='
        },
        link: function (scope, element, attrs, controllers, transclude) {
            scope.word = transclude().text();
            element.on('click', function() {
                scope.$emit('word-clicked', scope.word);
            });
        },
        templateUrl: 'tpl/document-word.html',
        transclude: true
    };
});
