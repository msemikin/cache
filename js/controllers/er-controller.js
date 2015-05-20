
var app = angular.module("cache");
var objD = new Array();

app.controller("ERController", ['$scope', 'diagramService', 'dragAndDropService', 'linkManipulationService', function($scope, diagram, dragAndDrop, linkManipulation) {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#er-model'),
        gridSize: 10,
		width: '100%',
		height: 600,
        model: graph
    });

    diagrams.ER = graph;
    
    linkManipulation(graph, paper);
    dragAndDrop('.entity', '.er-model', undefined, graph, diagram.entity);
    dragAndDrop('.attribute', '.er-model', undefined, graph, diagram.attribute);
    dragAndDrop('.association', '.er-model', undefined, graph, diagram.association);
    
    var focused = undefined;

    // dbl-click
    paper.on("cell:pointerdblclick", function (cellView, evt, x, y) {
        // clicked on link
        if(cellView.model.attributes.type === 'link'){
            console.log(cellView.model.attributes);	
	    $scope.linkLabels = {};
            $scope.linkLabels.first = cellView.model.attributes.labels[0].attrs.text.text;
            $scope.linkLabels.second = cellView.model.attributes.labels[2].attrs.text.text;
	    focused = cellView;
            $scope.openLinkOptions();            
        } // clicked on object
        else {
            $scope.renameValue = cellView.model.attributes.attrs.text.text;
            $scope.openObjectOptions();
        }
        focused = cellView;
    });

    // editing link
    $scope.linkLabels = undefined;
    $scope.linkOptionsShow = false;

    $scope.openLinkOptions = function(){
        console.log(this.linkLabels.first);
        $scope.$apply(function(){
            $scope.linkOptionsShow = true;
        });
    };

    $scope.submitLinkChange = function(){
		console.log(focused.model.label);
		focused.model.label(0, {attrs:{text: {text:this.linkLabels.first}}});
		focused.model.label(2, {attrs:{text: {text:this.linkLabels.second}}});
		$scope.linkOptionsShow = false;
	};
    $scope.cancelLinkChange = function(){
		$scope.linkOptionsShow = false;
	};


    // editing object
    $scope.objectOptionsShow = false;
    $scope.renameValue = undefined;
    $scope.renameShow = false; 


    $scope.openObjectOptions = function () {
        $scope.$apply(function () {
            $scope.objectOptionsShow = true;
        })
    }
    $scope.closeObjectOptions = function () {
        $scope.objectOptionsShow = false;
    }

    $scope.deleteObj = function () {
        var text = focused.el.textContent;
        $scope.objectOptionsShow = false;
        focused.remove();
        objSt.push(text);
        getList();
    }

    $scope.renameObj = function () {
        $scope.objectOptionsShow = false;
        $scope.renameShow = true;
    };
    $scope.submitRename = function () {
        var symbolLength = 7;
        var width = symbolLength * $scope.renameValue.length + 80;
        $scope.renameValue = $scope.renameValue.toLowerCase();
        $scope.renameValue = $scope.renameValue[0].toUpperCase() + $scope.renameValue.substr(1, $scope.renameValue.length);
        $scope.renameShow = false;
        focused.model.attr({
            text: {
                text: $scope.renameValue
            }
        });
	focused.model.resize(width, 40);
    };
    $scope.cancelRename = function () {
        $scope.renameShow = false;
    };
}]);
