'use strict';
/* globals document, canvg, atob, Blob, FormData: true */
angular.module('db').controller("NavCtrl", function($scope, Config) {
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
        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            diagrams = {
                useCase: '#functional-model',
                objectRelations: '#object-relations',
                er: '#er'
            },
            formData = new FormData(),
            markup;

        formData.append('projectId', 0);
        $.each(diagrams, function(key, value) {
            markup = $('<div>').append($(value).children('svg').clone()).html();
            canvg(canvas, markup);
            formData.append(key, toBlob(canvas.toDataURL()));
            ctx.clearRect(0, 0, $(canvas).width(), $(canvas).height());
        });

        $.ajax({
            type: 'POST',
            url: Config.API_PATH + 'project/document/generate',
            data: formData,
            processData: false,
            contentType: false
        }).done(function(response) {
            console.log(response);
        });
    };
});
