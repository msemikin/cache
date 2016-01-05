/**
 * Created by maxim on 04.10.15.
 */
'use strict';
angular.module('db').directive('documentWord', function () {
    return {
        scope: {
            wordId: '='
        },
        link: function (scope, element, attrs, controllers, transclude) {
            scope.word = transclude().text();

            element.on('click', function() {
                var word = {
                    wordId: scope.wordId,
                    articleId: scope.articleId,
                    word: scope.word
                };
                console.log(word);
                scope.$emit('word-clicked', word);
            });
        },
        templateUrl: 'tpl/document-word.html',
        transclude: true
    };
});
