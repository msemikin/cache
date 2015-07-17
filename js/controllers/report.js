var reports = [];
var sc;

var app = angular.module('cache');
app.controller('ReportsController', ['$scope', function($scope){
    $scope.initDropdowns = function () {
        $(document).ready(function () {
            $('.dropdown-toggle').dropdown();
        });
    };
    $scope.initDropdowns();

    $scope.reports = reports;
    $scope.objects = objects;
    $scope.$watch('objects', function(newValue, oldValue){
        console.log(oldValue.length + ' ' +newValue.length);
        
        if(oldValue.length < newValue.length) {
            
            var obj = newValue[newValue.length - 1];
            
            var objectAttrs = [];
            for(var j = 0; j < obj.attribute.length; j++) {
                objectAttrs.push({
                    name: obj.attribute[j],
                    added: false
                });
            }
            
            var reportsObject = {
                name: obj.name,
                attrs: objectAttrs,
                added: false
            }
            
            for(var i = 0; i < reports.length; i++) {
                reports[i].objects.push(reportsObject);
            }
        }
        else {
            
            for(var j =0; j< oldValue.length; j++){
                if(oldValue[j].name !== newValue[j].name){
                    var deleted = oldValue[j];
                    break;
                }
            }
            
            for(var k = 0; k<reports.length; k++){
                for(var l =0; l<reports[k].objects.length; l++){
                    if(reports[k].objects[l].name === deleted.name) {
                        reports[k].objects.splice(l, 1);
                    }
                }
            }
        }
    
    
    }, true);
    $scope.selected = 0;
    sc = $scope;

    $scope.newreportName = '';

	$scope.addReport = function() {
        var reportObjects = [];
        for(var i = 0; i<objects.length; i++) {
            
            var obj = objects[i];
            var objectAttrs = [];
            for(var j = 0; j < obj.attribute.length; j++) {
                objectAttrs.push({
                    name: obj.attribute[j],
                    added: false
                });
            }
            
            reportObjects.push({
                name: objects[i].name,
                attrs: objectAttrs,
                added: false
            });
        }
        
        reports.push({
            name: this.newreportName,
            objects: reportObjects
        });
        
        this.selectReport(reports.length-1);
	}
    
    $scope.addObject = function(objectName){
    	$('.objDropup').toggleClass('open');
        
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