var statistics = [];
var sc;

var app = angular.module('cache');
app.controller('StatisticsController', ['$scope', function($scope){
    $scope.initDropdowns = function () {
        console.log('initDropdowns');
        $(document).ready(function () {
            $('.dropdown-toggle').dropdown();
        });
    };
    $scope.initDropdowns();

    $scope.statistics = statistics;
    $scope.selectedStatistic = undefined;
    sc = $scope;

    $scope.newStatisticName = '';

	$scope.addStatistic = function() {
        var statisticObjects = [];
        for(var i = 0; i<objects.length; i++) {
            
            var obj = objects[i];
            var objectAttrs = [];
            for(var j = 0; j < obj.attribute.length; j++) {
                objectAttrs.push({
                    name: obj.attribute[j],
                    added: false
                });
            }
            
            statisticObjects.push({
                name: objects[i].name,
                attrs: objectAttrs,
                added: false
            });
        }
        
        statistics.push({
            name: this.newStatisticName,
            objects: statisticObjects
        });
        
        this.selectStatistic(statistics.length-1);
	}
    
    $scope.addObject = function(objectName){
    	$('.objDropup').toggleClass('open');
        
        var obj = _.first(_.where(this.selectedStatistic.objects, {name: objectName}));
        obj.added = true;
        this.initDropdowns();
    };
    
    $scope.getUnaddedObjects = function() {
        if(this.selectedStatistic) {
            return _.where(this.selectedStatistic.objects, {added: false});
        }
    }
    $scope.getAddedObjects = function() {
        if(this.selectedStatistic) {
            return _.where(this.selectedStatistic.objects, {added: true});
        }
    }
    
    $scope.addAttr = function(objectName, attrName){
    	$('.attrDropup').toggleClass('open');
        
        var obj = _.first(_.where(this.selectedStatistic.objects, {name: objectName}));
        var attr = _.first(_.where(obj.attrs, {name: attrName}));
        attr.added = true;
    };
    
	$scope.removeAttr = function(objectName, attrName){
        var obj = _.first(_.where(this.selectedStatistic.objects, {name: objectName}));
        var attr = _.first(_.where(obj.attrs, {name: attrName}));
            attr.added = false;
	}
    
	$scope.selectStatistic = function(index) {
        this.selectedStatistic = statistics[index];

	}
    
    $scope.isSelected = function(statisticName) {
        var result = this.selectedStatistic.name === statisticName;
        console.log(this.selectedStatistic.name + ' ' + statisticName + ' ' + result);
        return result;
    }

	$scope.getUnaddedAttrs = function(objectName) {
        if(this.selectedStatistic) {
            var obj = _.first(_.where(this.selectedStatistic.objects, {name: objectName}));
            var res = _.where(obj.attrs, {added: false});
            return res;
        }
	}

	$scope.getAddedAttrs = function(objectName) {
        if(this.selectedStatistic) {
            var obj = _.first(_.where(this.selectedStatistic.objects, {name: objectName}));
            return _.where(obj.attrs, {added: true});
        }
	}

}]);
