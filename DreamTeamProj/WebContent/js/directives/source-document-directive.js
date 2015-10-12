'use strict';
angular.module('db').directive('sourceDocument', function($compile) {
    return {
        scope: {},
        link: function(scope, element, attrs) {
            scope.openedArticleId = null;
            scope.$on('doc-imported', function() {
                _.each(element.find('p'), function (article, index) {
                    article.setAttribute('document-article', '');
                    article.setAttribute('article-id', index);
                    $compile(article)(scope);
                });
                scope.$broadcast('articles-extracted');
            });
            scope.$on('article-box-opening', function (e, articleId) {
                // scope.$broadcast('close-article-boxes');
            });
            scope.$on('article-box-closing', function (e, articleId) {

            });
            scope.$on('article-word-clicked', function (e, args) {
                // we need to open the add box
                if (scope.openedArticleId === null) {
                    scope.$broadcast('open-article-box', args.articleId);
                    scope.openedArticleId = args.articleId;
                }
                scope.$broadcast('add-word', args.word);
                e.stopPropagation();
            });
        }
    };
});
