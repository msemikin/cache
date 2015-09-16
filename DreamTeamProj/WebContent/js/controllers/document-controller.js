'use strict';
angular.module('db').controller('DocumentCtrl', function($scope, Modals) {
    $scope.uploadDoc = function() {
        Modals.open('upload-doc').then(function (html) {
            $('#doc-content-frame').html(html);
        });
    };
});
