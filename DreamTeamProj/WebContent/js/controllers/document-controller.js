'use strict';
angular.module('db').controller('DocumentCtrl', function($scope, Config) {
    $scope.showDocPanel = false;
    $scope.doc = {};
    $scope.showDocInput = function() {
        $scope.showDocPanel = true;
    };
    $scope.hideDocInput = function() {
        $scope.showDocPanel = false;
    };
    $scope.uploadDoc = function() {
        console.log($scope.doc);
        $.ajax({
            type: 'POST',
            url: 'https://upload.view-api.box.com/1/documents',
            //contentType: 'multipart/form-data',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Token " + Config.BOX_API_KEY);
            },
            data: $scope.doc.src,
            success: function(response) {
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            },
            processData: false
        });
    };
});
