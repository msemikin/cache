/**
 * Created by maxim on 04.10.15.
 */
'use strict';
angular.module('db').directive('documentArticle', function($compile) {

    function findLowLevelNodes(root, selector) {
        function find(node) {
            var lowLevelNodes = [],
                $node = $(node),
                nodes = $node.find(selector);
            if (nodes.length > 0) {
                _.each(nodes, function(element) {
                    lowLevelNodes = lowLevelNodes.concat(find(element));
                });
            } else {
                lowLevelNodes.push($node);
            }
            return lowLevelNodes;
        }
        return find(root);
    }

    function prepareWord(word, id) {
        return '<document-word word-id="' + id + '">' + word + '</document-word>';
    }

    function extractWords($node) {
        return _.map(_.filter($node.text().split(' '), function (word) {
            return word;
        }), function(word, index) {
            return prepareWord(word, index);
        });
    }

    return {
        scope: {
            articleId: '='
        },
        link: function(scope, element, attrs, controllers, transclude) {
            element.prepend(transclude());
            var $nodes = findLowLevelNodes(element, 'span');
            _.each($nodes, function ($node) {
                var words = extractWords($node);
                $node.html('');
                _.each(words, function(word) {
                    $node.append(word);
                    var $word = $node.children('document-word:last-child');
                    $compile($word)(scope);
                });
            });
            var $page = element.parents('.jdoc-page');
            var inner = element.css('padding-left');
            var outer = $page.css('padding-left');
            var total = parseInt(inner, 10) + parseInt(outer, 10);
            element.find('.article-add-box').css('margin-left', -total).outerWidth($page.outerWidth());

            // wrap the event for the document to process
            scope.$on('word-clicked', function(event, word) {
                scope.$emit('article-word-clicked', {
                    word: word,
                    articleId: scope.articleId
                });
                event.stopPropagation();
            });
        },
        templateUrl: 'tpl/document-article.html',
        transclude: true
    };
});
