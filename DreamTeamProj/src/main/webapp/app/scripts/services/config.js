'use strict';
angular.module('db').service('Config', function () {
    return {
        API_PATH: 'http://localhost:8080/',
        BOX_API_KEY: 's7yzxq5bp8nl1m1ntyfdp9tewor5hdy8',
        UPDATE_INTERVAL: 10000
    };
});
