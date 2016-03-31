'use strict';
angular.module('db').controller('HeaderCtrl', function($scope, $rootScope, AuthService,
        $state, DocumentService, ngProgressFactory, EVENTS) {
    $scope.logout = AuthService.logout;
    $scope.$state = $state;
    $scope.document = null;
    $scope.addDocument = function () {
        DocumentService.uploadDocument($scope.document);
    };
    $scope.progressBar = ngProgressFactory.createInstance();
    $scope.progressBar.setColor('#2196F3');
    $rootScope.$on(EVENTS.DOCUMENT_UPLOAD_STARTED, function () {
        $scope.progressBar.reset();
    });
    $rootScope.$on(EVENTS.DOCUMENT_UPLOAD_PROGRESS, function (percentage) {
        $scope.progressBar.set(percentage);
    });
    $rootScope.$on(EVENTS.DOCUMENT_UPLOAD_FINISHED, function () {
        $scope.progressBar.complete();
    });
    $rootScope.$on(EVENTS.DOCUMENT_UPLOAD_ERROR, function () {
        $scope.progressBar.reset();
    });
});