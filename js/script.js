/*FANTOM DATA*/
var app = angular.module("db");
app.controller("guicontroller", ["$scope", function ($scope) {
        $scope.objects = [
			{AttrCount: 111, Name: "Hockey puck"},
			{AttrCount: 22, Name: "Golf club"},
			{AttrCount: 31, Name: "Baseball bat"},
			{AttrCount: 4, Name: "Lacrosse stick"},
			{AttrCount: 4, Name: "Lacrosse stick"},
			{AttrCount: 4, Name: "Lacrosse stick"},
			{AttrCount: 4, Name: "Lacrosse stick"},
			{AttrCount: 4, Name: "Lacrosse stick"}
		];
    }]);
