'use strict';
angular.module('db').controller('InformationalRequirementsCtrl', ['$scope', 'Object', 'Search', 'Sort', 'Filter', 'Utils', function($scope, Object, Search, Sort, Filter, Utils) {

    var tabs = {
        search: {
            name: 'search',
            entityHeadText: 'Объекты поиска',
            attrsHeadText: 'Атрибуты для поиска',
            dataProvider: Search,
            requirements: [],
            requirement: null
        },
        sort: {
            name: 'sort',
            entityHeadText: 'Объекты сортировки',
            attrsHeadText: 'Атрибуты для сортировки',
            dataProvider: Sort,
            requirements: [],
            requirement: null
        },
        filter: {
            name: 'filter',
            entityHeadText: 'Объекты  фильтрации',
            attrsHeadText: 'Атрибуты для фильтрации',
            dataProvider: Filter,
            requirements: [],
            requirement: null
        }
    };

    // $(document).ready(function() {
    //     $('.dropdown-toggle').dropdown();
    // });
    $scope.entities = [];
    $scope.selectTab = function(name) {
        $scope.tab = tabs[name];
        updateRequirements();
    };
    $scope.tab = tabs.search;

    function updateObjects() {
        return Object.load().then(function(data) {
            $scope.entities = data;
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

    function getObject(requirement) {
        var entityIndex = _.findIndex($scope.entities, {
            id: requirement.entity.id
        });
        return $scope.entities[entityIndex];
    }

    // function handleObjectLoad(entity) {
    //     $scope.entity = entity;
    //     return entity;
    // }
    //

    function selectRequirement(requirement) {
        // requirement is an id
        $scope.tab.requirement = requirement;
        if (requirement) {
            fillAvailableAttrs(requirement);
        }
    }

    function fillAvailableAttrs(requirement) {
        var entity = getObject(requirement);
        $scope.availableAttrs = Utils.difference(entity.attrs, $scope.tab.requirement.entity.attrs);
    }

    function fillAvailableObjects(requirements) {
        var requirementObjects = _.map(requirements, function(requirement) {
            return requirement.entity;
        });
        $scope.availableObjects = Utils.difference($scope.entities, requirementObjects);
        return requirements;
    }

    $scope.selectRequirement = selectRequirement;
    $scope.addRequirement = function(entity) {
        var requirementObj = {
            id: entity.id,
            name: entity.name,
            attrs: []
        };
        $scope.tab.dataProvider.create({
                entity: requirementObj
            })
            .then(function(response) {
                return updateRequirements(response.id);
            });
    };

    $scope.addAttr = function(attr) {
        var requirement = $scope.tab.requirement;
        requirement.entity.attrs.push(attr);
        $scope.tab.dataProvider.update(requirement).then(function(response) {
            updateRequirements(requirement.id);
        });
    };

    $scope.removeAttr = function(attr) {
        var requirement = $scope.tab.requirement;
        var index = _.findIndex(requirement.entity.attrs, {
            id: attr.id
        });
        requirement.entity.attrs.splice(index, 1);
        $scope.tab.dataProvider.update(requirement).then(function(response) {
            updateRequirements(requirement.id);
        });
    };

}]);
