'use strict';
angular.module('db').controller('GenerateDocCtrl', function($scope, Modals, Config, $rootScope) {

    $scope.generateDoc = function() {
        $scope.documentStatus = "generating";

        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            diagrams = {
                useCase: '#functional-model',
                objectRelations: '#object-relations-model',
                er: '#er-model'
            },
            data = {
                projectId: 0
            },
            markup;

        $.each(diagrams, function(key, value) {
            var diagramSvg = $(value).children('svg');
            var diagramSvgCopy = diagramSvg.clone();
            diagramSvgCopy.find('.marker-arrowhead-group, .tool-remove, .tool-options, .marker-vertices').remove();
            var svgStr = diagramSvgCopy.prop('outerHTML');
            canvg(canvas, svgStr);
            data[key] = encodeURIComponent(canvas.toDataURL());
            ctx.clearRect(0, 0, $(canvas).width(), $(canvas).height());
        });

        $.fileDownload(Config.API_PATH + 'project/document/generate', {
            httpMethod: "POST",
            data: data,
            successCallback: function() {
                Modals.resolve();
            }
        });
    };

    $rootScope.$on('modals.show.generate-doc', function() {
        console.log('modal show');
        $scope.generateDoc();
    });

});
