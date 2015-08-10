var app = angular.module('cache');
app.controller('InformationalRequirementsCtrl', ['$scope', function($scope){
	$(document).ready(function () {
        $('.dropdown-toggle').dropdown();
    });

    $scope.selectNewObj = function(index){
    	$('.objDropup').toggleClass('open');
    	var newObj = objects[index];
		data[tabs[this.tab]].push({name: newObj.name, attribute: newObj.attribute.slice(), attrs: []});
    };
    $scope.selectNewAttr = function(attr){
    	$('.attrDropup').toggleClass('open');
		var selected = data[tabs[this.tab]].selected;
		data[tabs[this.tab]][selected].attrs.push(attr);
    };


	var tabs = {
		0:'searches',
		1: 'sorts',
		2: 'filters'
	};

	$scope.tab = 0;

	$scope.searches = data.searches;
	$scope.sorts = data.sorts;
	$scope.filters = data.filters;

	data.searches.selected = 0;
	data.sorts.selected = 0;
	data.filters.selected = 0;

	$scope.changeTab = function(tab){
		$scope.tab = tab;
		this.newAttr = 'Атрибут';
		this.newObj = {name:'Объект'};
	}

    $scope.getCurrentObjects = function() {
    	return data[tabs[this.tab]];
    }

    $scope.getSelectedIndex = function() {
    	return data[tabs[this.tab]].selected;
    }

	$scope.addObj = function() {
	}

	$scope.selectObj = function(index) {
		data[tabs[this.tab]].selected = index;
	}

	$scope.addAttr = function() {
	}

	$scope.getPossibleAttrs = function() {
		var selected = data[tabs[this.tab]].selected;
		if(data[tabs[this.tab]][selected]) {
			return data[tabs[this.tab]][selected].attribute;
		}
	}

	$scope.getCurrentAttrs = function() {
		var selected = data[tabs[this.tab]].selected;
		if(data[tabs[this.tab]][selected]) {
			return data[tabs[this.tab]][selected].attrs;
		}
	}

	$scope.removeAttr = function(index){
		var selected = data[tabs[this.tab]].selected;
		data[tabs[this.tab]][selected].attrs.splice(index,1);
	}

}]);
