'use strict';
/* globals document, canvg, atob, Blob: true */
angular.module('db').controller('GenerateDocCtrl', function($scope, Modals, Config, $rootScope) {
    function toBlob(dataURL) {
        var base64 = dataURL.split(',')[1],
            byteChars = atob(base64),
            byteNumbers = [],
            i,
            byteArray;
        for (i = 0; i < byteChars.length; i++) {
            byteNumbers.push(byteChars.charCodeAt(i));
        }
        byteArray = new Uint8Array(byteNumbers);
        return new Blob(byteArray, {
            type: 'image/png'
        });
    }

    $scope.generateDoc = function() {
        $scope.documentStatus = "generating";

        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            diagrams = {
                useCase: '#functional-model',
                objectRelations: '#object-relations',
                er: '#er'
            },
            data = {
                projectId: 0
            },
            markup;

        $.each(diagrams, function(key, value) {
            markup = $('<div>').append($(value).children('svg').clone()).html();
            canvg(canvas, markup);
            data[key] = encodeURIComponent(canvas.toDataURL());
            ctx.clearRect(0, 0, $(canvas).width(), $(canvas).height());
        });

        console.log(data);

        $.ajax({
            type: 'POST',
            url: Config.API_PATH + 'project/document/generate',
            data: data,
            error: function(response) {
                console.log(response.responseText);
                $scope.documentStatus = "ready";
                $('#download-doc').attr({
                    href: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8, ' + encodeURI(response.responseText),
                    download: 'generated.docx'
                });
            }
        }).done(function(response) {
            console.log(response);
            $scope.documentStatus = "ready";
            $('#download-doc').attr({
                href: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8, ' + encodeURI(response),
                download: 'generated.docx'
            });
        });
    };

    $rootScope.$on('modals.show.generate-doc', function() {
        console.log('modal show');
        $scope.generateDoc();
    });

});
