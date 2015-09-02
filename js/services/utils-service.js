'use strict';
angular.module('cache').service('Utils', function () {
    var Utils = {};

    Utils.difference = function (list1, list2) {
        var diff = [];
        if (!list1.length) {
            return list2;
        } else if (!list2.length) {
            return list1;
        }
        _.each(list1, function(elOuter) {
            if (!_.contains(
                    _.map(list2, function(elInner) {
                        return elInner.id;
                    }),
                    elOuter.id
                )) {
                diff.push(elOuter);
            }
        });
        return diff;
    };

    return Utils;

});
