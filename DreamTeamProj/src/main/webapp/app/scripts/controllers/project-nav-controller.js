'use strict';
angular.module('db').controller("ProjectNavCtrl", function($scope, Modals, $rootScope) {
    $scope.generateDoc = function () {
        Modals.open('generate-doc');
    };
    $scope.shrinkMenu = function () {
        $rootScope.$emit('shrink-menu');
    };
    $scope.uploadDoc = function() {
        Modals.open('upload-doc').then(function(html) {
            $('#doc-content-frame').html(html);
            $scope.$broadcast('doc-imported');
        });
    };
});
