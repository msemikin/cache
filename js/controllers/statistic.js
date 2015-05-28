var statistics = [];

var app = angular.module('cache');
app.controller('StatisticsController', ['$scope', function($scope){
	$(document).ready(function () {
        $('.dropdown-toggle').dropdown();
    });

    $scope.selectObj = function(index){
    	$('.objDropup').toggleClass('open');
    	var current = statistics[statistics.selected];
    	current.attrs = [];
    	current.object = {
    		name: objects[index].name,
    		attribute: objects[index].attribute.slice(),
    		attrs: []
    	};
    };
    $scope.selectAttr = function(attr){
    	$('.attrDropup').toggleClass('open');
    	statistics[statistics.selected].attrs.push(attr);
    };

    $scope.statistics = statistics;
    statistics.selected = 0;

    $scope.newStatistic = '';
    $scope.objects = objects;

	$scope.addStatistic = function() {
		statistics.push({
			name: this.newStatistic,
			object: undefined,
			attrs: []
		});
	}

	$scope.selectStatistic = function(index) {
		statistics.selected = index;
	}

	$scope.getPossibleAttrs = function() {
		var statistic = statistics[statistics.selected];
		if(statistic) {
			return statistics.object.attribute;	
		}
	}

	$scope.getCurrentAttrs = function() {
		var statistic = statistics[statistics.selected];
		if(statistic){
	 		return statistic.attrs;	
		}
	}

	$scope.getCurrentObject = function() {
		var statistic = statistics[statistics.selected];
		if(statistic){
			var object = statistic.object;	
			return  object ? object.name : 'Выбрать объект';
		}
	}
	$scope.removeAttr = function(index){
		statistics[statistics.selected].attrs.splice(index,1);
	}

}]);
