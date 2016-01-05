'use strict';
angular.module('db').controller('UploadDocCtrl', function($scope, Modals, Config) {
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
        var mime = dataURL.split(',')[0].match(/data\:(.*)/)[1];
        console.log(mime);
        return new Blob(byteArray, {
            type: mime
        });
    }
    function reset() {
        $scope.doc = {};
        $scope.generating = false;
    }

    $scope.uploadDoc = function() {
        var jdoc = new jDoc();

        jdoc.on('readstart', function() {
            $scope.generating = true;
        });

        jdoc.on('readend', function(result) {
            console.log("END ", arguments);
        });

        jdoc.on('read', function(fileData) {
            Modals.resolve(fileData.html());
            reset();
        });

        jdoc.on('error', function(error) {
            console.log("ERROR ", arguments);
        });
        jdoc.read($scope.doc.file);
    };

    reset();

});
