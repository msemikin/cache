'use strict';
angular.module('db').service('DocumentService', function ($rootScope, Upload, EVENTS, Config) {
    return {
        uploadDocument: function (document) {
            $rootScope.$emit(EVENTS.DOCUMENT_UPLOAD_STARTED);
            Upload.upload({
                url: Config.API_PATH + 'upload',
                data: {document: document}
            }).then(function (resp) {
                $rootScope.$emit(EVENTS.DOCUMENT_UPLOAD_FINISHED);
            }, function (resp) {
                $rootScope.$emit(EVENTS.DOCUMENT_UPLOAD_ERROR);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total, 10);
                $rootScope.$emit(EVENTS.DOCUMENT_UPLOAD_PROGRESS, progressPercentage);
            });
        }
    };
});
