var app = angular.module('cache');
app.controller('UseCaseController',['$scope', 'diagramService', 'dragAndDropService', 'linkManipulationService', function($scope, diagram, dragAndDrop, linkManipulation){
    var graph = new joint.dia.Graph;
    diagrams.useCase = graph;
    var paper = new joint.dia.Paper({
        el: $('#functional-model'),
		width: '100%',
		height: 600,
        gridSize: 10,
        model: graph,
    })

    var focused = undefined;

    linkManipulation(graph, paper);
    dragAndDrop('.actor', '.functional-model', undefined, graph, diagram.actor);
    dragAndDrop('.service', '.functional-model', undefined, graph, diagram.service);
    

    // dbl-click
    paper.on("cell:pointerdblclick", function(cellView, evt, x, y) {
        if(cellView.model.attributes.type === 'link'){
            $scope.openLinkOptions();            
        } // clicked on object
        else {
            $scope.renameValue = cellView.model.attributes.attrs.text.text;
            $scope.openObjectOptions();
        }
        focused = cellView;
    });

    
    // for resizing
    /*    paper.on("cell:pointerdown", function (cellView, evt, x, y) {
            console.log(x + ", " + y);
            var figpos = cellView.model.attributes.position;
            var figsize = cellView.model.attributes.attrs.rect;
            console.log(cellView.model.attributes.attrs.text);
            console.log(isOnBorder(figpos.x, figpos.y, figsize.width, figsize.height, x, y));
        });
    */

    function isOnBorder(figx, figy, figwidth, figheight, curx, cury) {
        console.log(figheight);
        if (Math.abs(figx - curx) < 10) {
            return "left";
        } else if (Math.abs(figy - cury) < 10) {
            return "top";
        } else if (Math.abs((curx - figx) - figwidth) < 10) {
            return "right";
        } else if (Math.abs((cury - figy) - figheight) < 10) {
            return "bottom";
        }
    }

    
    // link options	
    $scope.linkType = 'Association';
    $scope.linkOptionsShow = false;
    $scope.linkChangeShow = false;

    $scope.openLinkOptions = function(){
        $scope.$apply(function(){
            $scope.linkOptionsShow = true;
        });
    };
    
    $scope.changeLink = function() {
        $scope.linkOptionsShow = false;
        $scope.linkChangeShow = true;   
    }
    
    $scope.reverseLink = function() {
        var source = focused.model.attributes.attrs['.marker-source'];
        var target = focused.model.attributes.attrs['.marker-target'];
        console.log(source);
        focused.model.attr({
            '.marker-target': source,
            '.marker-source': target
        });
        
        $scope.linkOptionsShow = false;
    }

    var links = {
        'Association' : {
            '.connection': {'stroke-dasharray': '0 0'}
        },
        'Include' : {
            '.connection': {'stroke-dasharray': '5 2'},
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' },
            '.marker-source': { d: '' }
        },
        'Extend' : {
            '.connection': {'stroke-dasharray': '5 2'},
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' },
            '.marker-source': { d: '' }
        }
    }
    var labels = {
        'Association' : '',
        'Include' : '<include>',
        'Extend' : '<extend>'
    };
    
    $scope.submitLinkChange = function(){
		focused.model.attr(links[this.linkType]);
        focused.model.label(1, {attrs:{text: {text: labels[this.linkType]}}});
		$scope.linkChangeShow = false;
	};
    $scope.cancelLinkChange = function(){
		$scope.linkChangeShow = false;
	};
    
    //
    // object options
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
