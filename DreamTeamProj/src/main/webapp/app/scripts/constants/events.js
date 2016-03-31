'use strict';
angular.module('db').constant('EVENTS', {
    DOCUMENT_UPLOAD_STARTED: 'documentUploadStarted',
    DOCUMENT_UPLOAD_PROGRESS: 'documentUploadProgress',
    DOCUMENT_UPLOAD_FINISHED: 'documentUploadFinished',
    DOCUMENT_UPLOAD_ERROR: 'documentUploadFinished'
});
