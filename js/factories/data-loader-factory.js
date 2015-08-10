'use strict';
angular.module('cache').factory('DataLoader', function () {
    var data = [];

    function indexOf (value) {
        var index = _.findIndex(data, function (element) {
            return element.id === value.id;
        });
        return index;
    }

    return {
        extend: function () {
            return {
                create: function (value) {
                    data.push(value);
                    return !!value;
                },
                load: function () {
                    return data;
                },
                update: function (value) {
                    var index = indexOf(value);
                    data.splice(index);
                    data.push(value);
                    return true;
                },
                delete: function (value) {
                    var index = indexOf(value);
                    data.splice(index);
                    return true;
                },
                get: function (id) {
                    return _.findWhere({id: id});
                }
            };
        }
    };
});
