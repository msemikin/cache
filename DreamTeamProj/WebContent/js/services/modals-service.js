'use strict';
angular.module('db').service('Modals', function ($rootScope) {

    var modal = {
        deferred: null,
        params: null
    };

    function open (type, params, pipeResponse) {
        var previousDeferred = modal.deferred;

        modal.deferred = $q.defer();
        modal.params = params;

        if (previousDeferred && pipeResponse) {
            modal.deferred.promise.then(previousDeferred.resolve, previousDeferred.reject);
        } else if ( previousDeferred ) {
            previousDeferred.reject();
        }

        $rootScope.$emit('', type);

        return modal.deferred.promise;
    }

    function params () {
        return modal.params;
    }

    function reject (reason) {
        modal.deferred.reject(reason);
        modal.deferred = modal.params = null;
        $rootScope.$emit('modals.close');
    }

    function resolve (response) {
        if (!modal.deferred) {
            return;
        }
        modal.deferred.resolve(response);
        modal.deferred = modal.params = null;
        $rootScope.$emit('modals.close');
    }

    return {
        open: open,
        params: params,
        reject: reject,
        resolve: resolve
    };
});
