'use strict';
angular.module('db').service('Object', ['DataLoader', function(DataLoader) {
    return DataLoader.extend([{
        "id": 1,
        "name": "some object 1",
        "attrs": [{
            "id": 1,
            "name": "some attribute 1"
        }, {
            "id": 2,
            "name": "some attribute 2"
        }]
    }, {
        "id": 2,
        "name": "some object 2",
        "attrs": [{
            "id": 3,
            "name": "some attribute 3"
        }, {
            "id": 4,
            "name": "some attribute 4"
        }]
    }]
);
}]);
