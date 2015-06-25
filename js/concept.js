//создавать селект в яваскрипте


var app = angular.module("cache");
var changingAttribute = new Array();
var objIndex = 0;
var attrIndex = 0;


function addObj(textExt) {
    if (textExt == null) var text_pre = document.getElementById("wordTextBox").value;
    else var text_pre = textExt;
    var text = text_pre[0].toUpperCase() + text_pre.substr(1, text_pre.length);
    //отладка
    //var js = JSON.parse($.session.get('project'));
    var js1 = $.session.get('project');
    console.log("ввод:")
    console.log(text);
    console.log("массив:");
    if (text.length > 1) {
        var attributes = new Array();
        var obj = {
            name: text,
            attribute: attributes,
            isOnRelDiagram: false,
            isOnER: false,
            isEdited: false,
            project: js1
        }
        objects.push(obj);
        var scope = angular.element(document.getElementById("gor")).scope();
        for (o = 0; o < objects.length; o++) {
            console.log(objects[o].name);
        }
    }
    var scope = angular.element(document.getElementById("gor")).scope();
    scope.$apply(function () {
        scope.create("Napoleone Bounaparte");
    });
    refreshList(1);
    cleanTextBox('wordTextBox');

}

function addAttr(textExt) {
    var select = document.getElementById("List1");
    objIndex = select.selectedIndex;
    if (objIndex == -1) alert('Выберите объект!');

    var objinArr = findIndByObjName(select[select.selectedIndex].text);

    if (textExt == null) var attr_pre = document.getElementById("attrBox").value;
    else var attr_pre = textExt;
    var attrtext = attr_pre[0].toUpperCase() + attr_pre.substr(1, attr_pre.length);
    var obj = objects[objinArr];
    if (attrtext.length != 0 && attrtext.length != 1) {
        obj.attribute.push(attrtext);
        changingAttribute.push(attrtext);

    }
    refreshAttr(1);
    cleanTextBox('attrBox');
    var scope = angular.element(document.getElementById("gor")).scope();
    scope.$apply(function () {
        scope.updateObject();
    });
}

function refreshAttr(numb) {
    var nameList = "listTab" + numb;
    var listsThis = document.getElementsByName(nameList);
    var ind = findIndByObjName(listsThis[0][listsThis[0].selectedIndex].text);
    var mas = objects[ind].attribute;
    var select = listsThis[1];
    cleanList(1);
    if (typeof mas == 'string' || mas instanceof String) {
        select.options[select.options.length] = new Option(decode(mas));
    }
    else {
        for (i = 0; i < mas.length; i++) {
            select.options[select.options.length] = new Option(decode(mas[i]));
        }
    }
}

function deleteAttribute() {
    var select = document.getElementById("List2");
    objIndex = select.selectedIndex;
    objIndex = document.getElementById("List1").selectedIndex;
    attrIndex = document.getElementById("List2").selectedIndex;
    select[attrIndex].remove();
    objects[objIndex].attribute.splice(attrIndex, 1);
    angular.element($("#gor")).scope().updateObject();
}

function cleanList(list) {
    var nameList = "listTab" + list;
    var listsThis = document.getElementsByName(nameList);
    var select = listsThis[1];
    select.innerHTML = "";
}

function cleanTextBox(name) {
    var textBox = document.getElementById(name);
    textBox.value = "";
}

function setERDiagramm(name, value) {
    var scope = angular.element(document.getElementById("gor")).scope();
    scope.$apply(function () {
        scope.setERDiagr(name, value);
    });
}

function setRelDiagramm(name, value) {
    var scope = angular.element(document.getElementById("gor")).scope();
    scope.$apply(function () {
        scope.setRelDiagram(name, value);
    });
}
function encodeObject(objName) {
    objName.name = encode(objName.name);
    if (objName.attribute != undefined) {
        for (i = 0; i < objName.attribute.length; i++) {
            objName.attribute[i] = encode(objName.attribute[i]);
        }
    }
    return objName;

}

function decodeObject(objName) {
    objName.name = decode(objName.name);
    if (objName.attribute != undefined) {
        for (i = 0; i < objName.attribute.length; i++) {
            objName.attribute[i] = decode(objName.attribute[i]);
        }
    }
    return objName;

}
function split(attributes) {
    var attributesArr = new Array();
    attr = ""
    for (var i = 0; i < attributes.length; i++) {
        attr = attr + attributes.charAt(i);
        if (attributes.charAt(i) == '\u21B5') {
            attributesArr.push(attr);
            attr = "";
        }
    }
    if (attr !="") {
        attributesArr.push(attr);
    }
    return attributesArr;
}
function setObjects(gotObjects) {
    for (var i = 0; i < gotObjects.children.length; i++) {
        var obj = gotObjects.children[i];
        if (obj.attribute.toString().indexOf("\n")>-1) {
            obj.attribute = obj.attribute.split("\n");
        }
        else {
            var arr = new Array();
            if (obj.attribute.toString() !="") {
                arr.push(obj.attribute.toString());
            }
            obj.attribute = arr;
        }
        objects.push(decodeObject(obj));
    }
    refreshList(1);
    var objIndex = 0;
    var mas = objects[objIndex].attribute;
    var select = document.getElementById("List2");
    cleanList(1);
    if (typeof mas == 'string' || mas instanceof String) {
        select.options[select.options.length] = new Option(decode(mas));
    }
    else {
        for (i = 0; i < mas.length; i++) {
            select.options[select.options.length] = new Option(mas[i]);
        }
    }


}

app.controller("ctrl", function ($scope, $http) {


    $scope.create = function (objNam) {
        if (objNam != "Napoleone Bounaparte") {
            addObj();
        }
        $scope.obje = objects[objects.length - 1];
        var objAng = $scope.obje;
        var objName = encodeObject(objAng);
        $http.post("http://localhost:57772/csp/rest/json/object", objName)
            .success(function (data) {
                console.log("Добавили объект" + objName.name);
                decodeObject(objName);
            })
            .error(function (data) {
                console.log(data);
                console.log("Ошибка добавления компании");
            });
    };

    $scope.deleteObject = function () {
        var select = document.getElementById("List1");
        var objIndex = select.selectedIndex;
        var delIn = findIndByObjName(select[objIndex].text);
        if (delIn == -1) {
            console.log("not in objects");
            return;
        }

        $scope.obje = {
            name: objects[delIn].name,
            attribute:objects[delIn].attribute
        }

        var objName = $scope.obje;
        $http.delete("http://localhost:57772/csp/rest/json/object/" + encode(objName.name))
            .success(function (data) {
                console.log(" Удалили объект" + objName.name);
                decodeObject(objName);
            })
            .error(function (data) {
                console.log(data);
                console.log("Ошибка удаления компании");
            });

        objects.splice(delIn, 1);
        cleanList(1);
        refreshList(1);
    }

    $scope.updateObject = function () {
        objects.forEach(function (item, i, arr) {
            if (i == objIndex) {
                $scope.objec = {
                    name: item.name,
                    attribute: item.attribute,
                    isOnRelDiagram: item.isOnRelDiagram,
                    isOnER: item.isOnER,
                    project: $.session.get('project')
                }
                objName = $scope.objec;
                $http.put("http://localhost:57772/csp/rest/json/object/" + encode(objName.name), encodeObject(objName))
                    .success(function (data) {
                        console.log("Добавили объект" + objName.name);
                        decodeObject(objName);
                    })
                    .error(function (data) {
                        console.log(data);
                        console.log("Ошибка добавления компании");
                    });
            }
        });
    }

    $scope.sendEverything = function () {
        objects.forEach(function (item, i, arr) {
            $scope.objec = {
                name: item.name,
                attribute: item.attribute
            }
            objName = $scope.objec;
            $http.post("http://localhost:57772/csp/rest/json/object", encodeObject(objName))
                .success(function (data) {
                    console.log("Добавили объект" + objName.name);
                    decodeObject(objName)
                })
                .error(function (data) {
                    console.log(data);
                    console.log("Ошибка добавления компании");
                });
        });
    }

    $scope.saveDiagrams = function (diagrams) {
        $scope.objec = undefined;
        $scope.objec = JSON.stringify(diagrams);
        objName = $scope.objec;
        $http.post("http://localhost:57772/csp/rest/json/diagrams", encodeObject(objName))
            .success(function (data) {
                console.log("Добавили диаграммы");
                decodeObject(objName);
            })
            .error(function (data) {
                console.log(data);
                console.log("Ошибка добавления диаграммы");
            });
    }

    $scope.setERDiagr = function (objectName, value) {
        objects.forEach(function (item, i, arr) {
            if (item.name == objName) {
                $scope.objec = {
                    name: item.name,
                    attribute: item.attribute,
                    isOnRelDiagram: item.isOnER,
                    isOnER: value,
                    project: $.session.get('project')
                }
                objName = $scope.objec;
                $http.put("http://localhost:57772/csp/rest/json/object/" + encode(objName.name), encodeObject(objName))
                    .success(function (data) {
                        console.log("Установили ERDiagr для " + objName.name);
                        decodeObject(objName);
                    })
                    .error(function (data) {
                        console.log(data);
                        console.log("Ошибка добавления компании");
                    });
            }
        });
    }
    $scope.setRelDiagram = function (objectName, value) {
        objects.forEach(function (item, i, arr) {
            if (item.name == objName) {
                $scope.objec = {
                    name: item.name,
                    attribute: item.attribute,
                    isOnRelDiagram: value,
                    isOnER: item.isOnRelDiagram,
                    project: $.session.get('project')
                }
                objName = $scope.objec;
                $http.put("http://localhost:57772/csp/rest/json/object/" + encode(objName.name), encodeObject(objName))
                    .success(function (data) {
                        console.log("Установили RelDiagram для " + objName.name);
                        decodeObject(objName);
                    })
                    .error(function (data) {
                        console.log(data);
                        console.log("Ошибка добавления компании");
                    });
            }
        });
    }

    $scope.getAllProjectObjects = function () {
        var serverURL = "http://localhost:57772/csp/rest/json/objects";
        var proj;
        try {
            proj = $.session.get('project');
        }
        catch (e) {
            proj = $.session.get('project');
        }
        var url = serverURL + '/' + proj;

        var responsePromise = $http.get(url);

        responsePromise.error(function () {
            window.alert('error');
            console.log(arguments);
        });

        responsePromise.success(function (data) {
            if (Object.keys(data.children).length > 0) {
                setObjects(data);
            }
        });
    }
});



























