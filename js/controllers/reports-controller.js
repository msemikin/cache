'use strict';
var app = angular.module('cache');
app.controller('ReportsCtrl', ['$scope', 'Report', 'Object', function ($scope, Report, ObjectService) {
    $scope.initDropdowns = function () {
        $(document).ready(function () {
            $('.dropdown-toggle').dropdown();
        });
    };
    $scope.initDropdowns();

    $scope.reports = Report.load;
    $scope.objects = ObjectService.load;

    $scope.selected = 0;

    $scope.newreportName = '';

	$scope.addReport = function() {
        this.selectReport(reports.length-1);
	}

    $scope.addObject = function(objectName){
        var obj = _.first(_.where(this.reports[this.selected].objects, {name: objectName}));
        obj.added = true;
        this.initDropdowns();
    };

    $scope.getUnaddedObjects = function() {
        if(this.reports[this.selected]) {
            return _.where(this.reports[this.selected].objects, {added: false});
        }
    }
    $scope.getAddedObjects = function() {
        if(this.reports[this.selected]) {
            return _.where(this.reports[this.selected].objects, {added: true});
        }
    }

    $scope.addAttr = function(objectName, attrName){
    	$('.attrDropup').toggleClass('open');

        var obj = _.first(_.where(this.reports[this.selected].objects, {name: objectName}));
        var attr = _.first(_.where(obj.attrs, {name: attrName}));
        attr.added = true;
    };

	$scope.removeAttr = function(objectName, attrName){
        var obj = _.first(_.where(this.reports[this.selected].objects, {name: objectName}));
        var attr = _.first(_.where(obj.attrs, {name: attrName}));
            attr.added = false;
	}

	$scope.selectReport = function(index) {
        this.selected = index;

	}

    $scope.isSelected = function(reportName) {
        var result = this.reports[this.selected].name === reportName;
        console.log(this.reports[this.selected].name + ' ' + reportName + ' ' + result);
        return result;
    }

	$scope.getUnaddedAttrs = function(objectName) {
        if(this.reports[this.selected]) {
            var obj = _.first(_.where(this.reports[this.selected].objects, {name: objectName}));
            var res = _.where(obj.attrs, {added: false});
            return res;
        }
	}

	$scope.getAddedAttrs = function(objectName) {
        if(this.selected) {
            var obj = _.first(_.where(this.reports[this.selected].objects, {name: objectName}));
            return _.where(obj.attrs, {added: true});
        }
	}

}]);
