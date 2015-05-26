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

    //отладка
    console.log("ввод:")
    console.log(text);
    console.log("массив:");
    if (text.length > 1) {
        var attributes = new Array();
        var obj = {
            name: text,
            attr: attributes,
            isOnRelDiagram: false,
            isOnER: false
        }
        objects.push(obj);
        for (o = 0; o < objects.length; o++) {
            console.log(objects[o].name);
        }
    }
    refreshList(1);
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
    cleanList('List2');
    for(i = 0;i < mas.length;i++)
    {
        select.options[select.options.length] = new Option(mas[i]);
    }
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

function cleanList(list)
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
function encodeObject(objName) {
	objName.name = encode(objName);
	for(i = 0;i < objName.attr.length;i++)
    {
        objName.attr[i] = encode(objName.attr[i]);
    }
	return objName;
	
}
app.controller("ctrl", function ($scope,$http) {
	
		
	$scope.create = function (objName){
		addObj();
		$scope.objec = objects[objects.length-1];
		objName= $scope.objec;
		objName = encode(objName);
		//var text = text_pre[0].toUpperCase() + text_pre.substr(1, text_pre.length);
		$http.post("http://localhost:57772/csp/rest/json/object",objName)
		.success(function (data){console.log("Добавили объект"+objName.name);})
		.error(function (data) {console.log(data);console.log("Ошибка добавления компании");}); 
	};
	
	$scope.deleteObject = function (){
        var select = document.getElementById("List1");
		var objIndex = select.selectedIndex;
        var delIn = findIndByObjName(select[objIndex].text);
        if (delIn == -1) {
            console.log("not in objects");
            return;
        }

        $scope.obje = {
            name:objects[delIn].name,
           // attribute:objects[delIn].attr
        }

        var objName = $scope.obje;
        $http.delete("http://localhost:57772/csp/rest/json/object/"+objName.name)
        .success(function (data){console.log(" Удалили объект"+objName.name);})
        .error(function (data) {console.log(data);console.log("Ошибка удаления компании");});

        objects.splice(delIn,1);
        cleanList('List2');
        refreshList(1);
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



























