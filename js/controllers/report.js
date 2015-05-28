var reports = [];

var app = angular.module('cache');
app.controller('ReportsController', ['$scope', function($scope){
	$(document).ready(function () {
        $('.dropdown-toggle').dropdown();
    });

    $scope.selectObj = function(index){
    	$('.objDropup').toggleClass('open');
    	var current = reports[reports.selected];
    	current.attrs = [];
    	current.object = {
    		name: objects[index].name,
    		attribute: objects[index].attribute.slice(),
    		attrs: []
    	};
    };
    $scope.selectAttr = function(attr){
    	$('.attrDropup').toggleClass('open');
    	reports[reports.selected].attrs.push(attr);
    };

    $scope.reports = reports;
    reports.selected = 0;

    $scope.newStatistic = '';
    $scope.objects = objects;

	$scope.addReport = function() {
		reports.push({
			name: this.newStatistic,
			object: undefined,
			attrs: []
		});
	}

	$scope.selectReport = function(index) {
		reports.selected = index;
	}

	$scope.getPossibleAttrs = function() {
		var report = reports[reports.selected];
		if(report) {
			return report.object.attribute;
		}
	}

	$scope.getCurrentAttrs = function() {
		var report = reports[reports.selected];
		if(report){
	 		return report.attrs;	
		}
	}


	$scope.getCurrentObject = function() {
		var report = reports[reports.selected];
		if(report){
			var object = report.object;
			return  object ? object.name : 'Выбрать объект';
		}
	}
	$scope.removeAttr = function(index){
		reports[reports.selected].attrs.splice(index,1);
	}

}]);