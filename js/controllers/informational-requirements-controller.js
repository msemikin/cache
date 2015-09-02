'use strict';
angular.module('cache').controller('InformationalRequirementsCtrl', ['$scope', 'Object', 'Search', 'Sort', 'Filter', 'Utils', function($scope, Object, Search, Sort, Filter, Utils) {

    var tabs = {
        search: {
            name: 'search',
            objectHeadText: 'Объекты поиска',
            attrsHeadText: 'Атрибуты для поиска',
            dataProvider: Search,
            requirements: [],
            requirement: null
        },
        sort: {
            name: 'sort',
            objectHeadText: 'Объекты сортировки',
            attrsHeadText: 'Атрибуты для сортировки',
            dataProvider: Sort,
            requirements: [],
            requirement: null
        },
        filter: {
            name: 'filter',
            objectHeadText: 'Объекты  фильтрации',
            attrsHeadText: 'Атрибуты для фильтрации',
            dataProvider: Filter,
            requirements: [],
            requirement: null
        }
    };

    $(document).ready(function() {
        $('.dropdown-toggle').dropdown();
    });
    $scope.objects = [];
    $scope.selectTab = function (name) {
        $scope.tab = tabs[name];
    };
    $scope.selectTab('search')

    function updateObjects() {
        return Object.load().then(function(data) {
            $scope.objects = data;
        });
    }

    function updateRequirements(requirementId) {
        return $scope.tab.dataProvider.load()
            .then(fillAvailableObjects)
            .then(function(requirements) {
                var requirement = typeof requirementId === 'number' ? _.findWhere(requirements, {
                    id: requirementId
                }) : requirements[0];
                $scope.tab.requirements = requirements;
                return requirement;
            })
            .then(selectRequirement);
    }

    updateObjects().then(updateRequirements);

    function loadObject(requirement) {
        return Object.get(requirement.object.id).then(handleObjectLoad);
    }

    function handleObjectLoad(object) {
        $scope.object = object;
        return object;
    }

    function selectRequirement(requirement) {
        // requirement is an id
        $scope.tab.requirement = requirement;
        if (requirement) {
            loadObject(requirement).then(fillAvailableAttrs);
        }
    }

    function fillAvailableAttrs(object) {
        $scope.availableAttrs = Utils.difference(object.attrs, $scope.tab.requirement.object.attrs);
    }

    function fillAvailableObjects(requirements) {
        var requirementObjects = _.map(requirements, function(requirement) {
            return requirement.object;
        });
        $scope.availableObjects = Utils.difference($scope.objects, requirementObjects);
        return requirements;
    }

    $scope.selectRequirement = selectRequirement;
    $scope.addRequirement = function(object) {
        var requirementObj = {
            id: object.id,
            name: object.name,
            attrs: []
        };
        $scope.tab.dataProvider.create({
                object: requirementObj
            })
            .then(function(response) {
                return updateRequirements(response.id);
            });
    };

    $scope.addAttr = function(attr) {
        var requirement = $scope.tab.requirement;
        requirement.object.attrs.push(attr);
        $scope.tab.dataProvider.update(requirement).then(function(response) {
            updateRequirements(requirement.id);
        });
    };

    $scope.removeAttr = function(attr) {
        var requirement = $scope.tab.requirement;
        var index = _.findIndex(requirement.object.attrs, {
            id: attr.id
        });
        requirement.object.attrs.splice(index, 1);
        $scope.tab.dataProvider.update(requirement).then(function(response) {
            updateRequirements(requirement.id);
        });
    };

}]);
