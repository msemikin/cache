'use strict';
angular.module('db').controller('DocumentArticleCtrl', function ($scope) {
    $scope.addBoxOpened = false;
    $scope.addedWords = [];

    $scope.$on('open-article-box', function (event, articleId) {
        if (articleId === $scope.articleId) {
            $scope.addBoxOpened = true;
            $scope.addedWords = [];
        }
    });

    $scope.$on('add-word', function (event, word) {
        // if this article's box is closed - do not react
        if (!$scope.addBoxOpened) {
            return;
        }
        var words = $scope.addedWords.slice();
        words.push(word);
        $scope.addedWords = _.uniq(words);
    });
});
