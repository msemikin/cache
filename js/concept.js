//создавать селект в яваскрипте
var objects = new Array();
var listObjLen = objects.length;
var app = angular.module("cache");
var changingAttribute = new Array();
var objIndex = 0;
var attrIndex = 0;


function addObj(textExt)
{
    if (textExt == null) var text_pre = document.getElementById("wordTextBox").value;
    else var text_pre = textExt;
    var text = text_pre[0].toUpperCase() + text_pre.substr(1, text_pre.length);
    if (text.length != 0 && text.length != 1) {
        var select = document.getElementById("List1");
        var relSelect = document.getElementById("relationList");
        var erSelect = document.getElementById("erObjList");
        select.options[select.options.length] = new Option(text);
        relSelect.options[select.options.length] = new Option(text);
        erSelect.options[select.options.length] = new Option(text);
        var attributes = new Array();
        var obj = {
            name: text,
            attr: attributes,
            isOnRelDiagram: false,
            isOnER: false
        }
        objects.push(obj);
    }
    cleanTextBox('wordTextBox');
}

function addAttr(textExt)
{
    objIndex = document.getElementById("List1").selectedIndex;
    if(objIndex == -1) alert('Выберите объект!');

    if (textExt == null) var attr_pre = document.getElementById("attrBox").value;
    else var attr_pre = textExt;

    var attrtext = attr_pre[0].toUpperCase() + attr_pre.substr(1, attr_pre.length);
    var obj = objects[objIndex];
    if (attrtext.length != 0 && attrtext.length != 1) {
        obj.attr.push(attrtext);
		changingAttribute.push(attrtext);
		
    }
    refreshAttr();
    cleanTextBox('attrBox');
	var scope = angular.element(document.getElementById("gor")).scope();
			scope.$apply(function () {
			scope.updateObject();
			});
}

function refreshAttr() {
    var objIndex = document.getElementById("List1").selectedIndex;
    var mas = objects[objIndex].attr;
    var select = document.getElementById("List2");
    clean('List2');
    for(i = 0;i < mas.length;i++)
    {
        select.options[select.options.length] = new Option(mas[i]);
    }
}


function deleteObject()
{
	var select = document.getElementById("List1");
    var delIn = objSt.indexOf(select[objIndex].text);
    if (delIn > -1) objSt.splice(delIn,1);
    objects.splice(objIndex,1);
    select[objIndex].remove();
    clean('List2');
}

function deleteAttribute()
{
    var select = document.getElementById("List2");
	objIndex = select.selectedIndex;
    objIndex = document.getElementById("List1").selectedIndex;
    attrIndex = document.getElementById("List2").selectedIndex;
    select[attrIndex].remove();
    objects[objIndex].attr.splice(attrIndex,1);
	angular.element($("#gor")).scope().updateObject();
}

function clean(list)
{
    var select = document.getElementById(list);
    select.innerHTML = "";
}

function cleanTextBox(name)
{
    var textBox = document.getElementById(name);
    textBox.value = "";
}

function setERDiagramm (name,value) {
	var scope = angular.element(document.getElementById("gor")).scope();
			scope.$apply(function () {
			scope.setERDiagr(name,value);
			});
}

function setRelDiagramm (name,value) {
	var scope = angular.element(document.getElementById("gor")).scope();
			scope.$apply(function () {
			scope.setRelDiagram(name,value);
			});
}

app.controller("ctrl", function ($scope,$http) {
	
		
	$scope.create = function (objName){
		addObj();
		$scope.objec = objects[objects.length-1];
		objName= $scope.objec;
		//var text = text_pre[0].toUpperCase() + text_pre.substr(1, text_pre.length);
		$http.post("http://localhost:57772/csp/rest/json/object",objName)
		.success(function (data){console.log("Добавили объект"+objName.name);})
		.error(function (data) {console.log(data);console.log("Ошибка добавления компании");}); 
	};
	
	$scope.deleteObject = function (){
		var select = document.getElementById("List1");
		objIndex = select.selectedIndex;
		objects.forEach(function(item, i, arr) {
			if (i == objIndex) {
				$scope.objec = {
					name:item.name,
					attribute:item.attr
				}
				objName = $scope.objec;
				$http.delete("http://localhost:57772/csp/rest/json/object/"+objName.name)
				.success(function (data){console.log(" Удалили объект"+objName.name);})
				.error(function (data) {console.log(data);console.log("Ошибка удаления компании");}); 
			}
		});
		deleteObject();
	}
	$scope.updateObject = function() {
		objects.forEach(function(item, i, arr) {
			if (i == objIndex) {
				$scope.objec = {
					name:item.name,
					attribute:item.attr,
					isOnRelDiagram: item.isOnRelDiagram,
					isOnER: item.isOnER
				}
				objName = $scope.objec;
				$http.put("http://localhost:57772/csp/rest/json/object/"+objName.name,objName)
				.success(function (data){console.log("Добавили объект"+objName.name);})
			.error(function (data) {console.log(data);console.log("Ошибка добавления компании");});
			}
		});
	}
	
	$scope.sendEverything = function () {
		objects.forEach(function(item, i, arr) {
			$scope.objec = {
				name:item.name,
				attribute:item.attr
			}
			objName = $scope.objec;
			$http.post("http://localhost:57772/csp/rest/json/object",objName)
			.success(function (data){console.log("Добавили объект"+objName.name);})
			.error(function (data) {console.log(data);console.log("Ошибка добавления компании");});
		});
	}
	
	$scope.saveDiagrams = function(diagrams) {
		$scope.objec = undefined;
		$scope.objec = JSON.stringify(diagrams);
		objName = $scope.objec;
			$http.post("http://localhost:57772/csp/rest/json/diagrams",objName)
			.success(function (data){console.log("Добавили диаграммы");})
			.error(function (data) {console.log(data);console.log("Ошибка добавления диаграммы");});
	}
	
	$scope.setERDiagr = function(objectName, value) {
		objects.forEach(function(item, i, arr) {
			if (item.name == objName) {
				$scope.objec = {
					name:item.name,
					attribute:item.attr,
					isOnRelDiagram: value,
					isOnER: item.isOnER
				}
				objName = $scope.objec;
				$http.put("http://localhost:57772/csp/rest/json/object/"+objName.name,objName)
				.success(function (data){console.log("Добавили объект"+objName.name);})
			.error(function (data) {console.log(data);console.log("Ошибка добавления компании");});
			}
		});
	}
	$scope.setRelDiagram = function(objectName, value) {
		objects.forEach(function(item, i, arr) {
			if (item.name == objName) {
				$scope.objec = {
					name:item.name,
					attribute:item.attr,
					isOnRelDiagram: item.isOnRelDiagram,
					isOnER: value
				}
				objName = $scope.objec;
				$http.put("http://localhost:57772/csp/rest/json/object/"+objName.name,objName)
				.success(function (data){console.log("Добавили объект"+objName.name);})
			.error(function (data) {console.log(data);console.log("Ошибка добавления компании");});
			}
        });
    }
});



























