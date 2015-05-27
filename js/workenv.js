var field;
var tabs;
var contentDivs;
var textObj;
var canvas;
var index;
var objContainers;


window.onload = function () {
    contentDivs = document.getElementsByName("contentDiv");
    var json = $.session.get('session');
    if (json != undefined) {
        user = JSON.parse($.session.get('session'));
    }
    else {
        document.location.href="../index.html";
    }
    tabs = document.getElementsByName("tab");
    canvas = document.getElementById("pages-container");
    field = document.getElementById('file-field');
    objContainers = document.getElementsByName("objContainer");

    document.getElementById("userNameText").innerHTML = decode(user.children[0].name + " " + user.children[0].surname);
    var scope = angular.element(document.getElementById("gor")).scope();
    scope.$apply(function () {
        scope.getAllProjectObjects();
    });

    for (i = 0; i < tabs.length; i++) {
        tabs[i].onclick = changeTab;
        var bordWhite = document.createElement('div');
        bordWhite.className = "bottomWhite";
        contentDivs[i].className = "contentDiv";
        objContainers[i].className = "attr-objects-container";
        if (i != 0) {
            contentDivs[i].style.visibility = "hidden";
            bordWhite.style.visibility = "hidden";
            $(objContainers[i]).hide();
        }
        tabs[i].appendChild(bordWhite);
    }


    //получение текста выделения
    function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    //выделение при нажатии
    $(document).ready(function () {
        $('#pages-container').click(function (e) {
            getSelectionHtml();
        })
    });
	$(document).ready(function () {
        $('#userNameText').click(function (e) {
            redirecting();
        })
    });
	function redirecting() {
		var url = "http://localhost:57772/csp/user/git/pg/projects.html";
		window.location = url;
	}

    //удаление объекта
    $(function(){
        $("#List1").bind("dblclick", function(){
            var element = $("#List1 option:selected");
			var scope = angular.element(document.getElementById("gor")).scope();
			scope.$apply(function () {
			scope.deleteObject();
			});
        });
    });

    //удаление атрибута
    $(function(){
        $("#List2").bind("dblclick", function(){
            deleteAttribute();
        });
    });

    //отрисовка relations
    $(function(){
        $("#relationList").bind("dblclick", function(){
            var elem = $("#relationList option:selected").text();
			var scope = angular.element(document.getElementById("gor")).scope();
			scope.$apply(function () {
                var ind = findIndByObjName(elem);
                objects[ind].isOnRelDiagram = true;

                var figure = angular.injector(['ng', 'cache']).get("diagramService").createFigure('object', elem, {x: 100, y: 100});
                diagrams.objectRelation.addCell(figure);
                //setRelDiagramm(elem, 'true');
			});
            //deleteObject();
            refreshList(2);
        });
    });

    //отрисовка ER
    $(function(){
        $("#erObjList").bind("dblclick", function(){
            var elem = $("#erObjList option:selected").text();
			var scope = angular.element(document.getElementById("gor")).scope();
			scope.$apply(function () {
                var ind = findIndByObjName(elem);
                objects[ind].isOnER = true;
                //setERDiagramm(elem, 'true');
			});
            //deleteObject();
            refreshList(3);
        });
    });

    //выделение текста
    function getSelectionHtml() {
        var html = "";
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        var intersection = FindIntersection(html, $('#pages-container').text());
        if (intersection) {
            html = $('#pages-container').text().slice(intersection.position, intersection.position + intersection.length);
        }
        if (html) {
            if (html.length > 40) {
                window.alert("Размер текста не должен превышать 40 символов");
                return;
            }
            var ind = document.getElementById("List1").selectedIndex;
            if (ind == -1) {
                addObj(html);
                document.getElementById("List1").selectedIndex = -1;
            }
            else {
                addAttr(html);
                document.getElementById("List1").selectedIndex = -1;
            }
        }
    }


    //Чтение документа

    var jD = new jDoc();

    jD.on('readstart', function () {
        canvas.innerHTML = "";
        canvas.style.backgroundColor = "#fff";
        console.log("START ", arguments);
    });

    jD.on('readend', function () {
        console.log("END ", arguments);
    });

    jD.on('read', function (fileData) {
        console.log("READ ", arguments);
        console.log("File name -", fileData.getName());
        console.log("Words count -", fileData.getWordsCount());
        console.log("Pages count -", fileData.getPagesCount());

        //Отображение html-файла
        canvas.appendChild(fileData.html());

        //ненужная фигня
        /*var textObj = fileData.data();
         console.log(textObj);
         //тестовая роспись дока без стилей
         for(i = 0; i < textObj.pages.length; i++)
         {
         for(j = 0; j < textObj.pages[i].children.length; j++)
         {
         for(k = 0; k < textObj.pages[i].children[j].children.length; k++)
         {
         var temp = document.createElement('span');
         /*try
         {
         var tempin = textObj.pages[i].children[j].children[k].properties.textContent;
         }
         finally
         {
         continue;
         }
         var tempin = textObj.pages[i].children[j].children[k].properties.textContent;

         //проверка на пустой блок
         if (isSpases(tempin)) continue;


         var str = "";
         //если блок начинается
         if(!find(chars ,tempin[0]) && k!=0) str = " ";
         if(tempin[tempin.length-1] == ' ') tempin = tempin.substring(0, tempin.length - 1);
         str += tempin + '1';
         temp.innerHTML = str;
         canvas.appendChild(temp);
         if(k == textObj.pages[i].children[j].children.length - 1)
         {
         canvas.appendChild(document.createElement("br"));
         canvas.appendChild(document.createElement("br"));
         }

         }
         }
         }
         console.log(canvas);*/

        Array.prototype.forEach.call(document.querySelectorAll('.pages-container > div'), function (page) {
            if (page.scrollHeight > page.offsetHeight) {
                console.log('Invalid page', {
                    page: page,
                    pageHeight: page.offsetHeight,
                    contentHeight: page.scrollHeight
                });
            }
        })
    });

    jD.on('error', function () {
        console.log("ERROR ", arguments);
    });

    field.onchange = function (e) {
        jD.read(e.target.files[0]);
    };
}



//Переключение вкладок
function changeTab() {
    for (j = 0; j < tabs.length; j++) {
        if (this == tabs[j]) {
            tabs[j].setAttribute("class", "chosenTab");
            $(objContainers[j]).show();
            contentDivs[j].style.visibility = "visible";
            if (j != 0) tabs[j - 1].setAttribute("class", "left-tab");
            for (var t = 0; t < tabs[j].childNodes.length; t++) {
                if (tabs[j].childNodes[t].className == "bottomWhite") {
                    tabs[j].childNodes[t].style.visibility = "visible";
                    break;
                }
            }

            //обновление списков
            refreshList(j + 1);
        }
        else {
            tabs[j].setAttribute("class", "tab");
            contentDivs[j].style.visibility = "hidden";
            $(objContainers[j]).hide();
            for (var q = 0; q < tabs[j].childNodes.length; q++) {
                if (tabs[j].childNodes[q].className == "bottomWhite") {
                    tabs[j].childNodes[q].style.visibility = "hidden";
                    break;
                }
            }
        }
    }
}

//файнд интерсекшн фром старт
function FindIntersectionFromStart(a, b) {
    for (var i = a.length; i > 0; i--) {
        d = a.substring(0, i);
        j = b.indexOf(d);
        if (j >= 0) {
            return ({position: j, length: i});
        }
    }

    return null;
}


function disabled(field) {
    for (i = 0; i < field.length; i++) {
        field[i].checked = false;
    }
}

//файнд интерсекшн
function FindIntersection(a, b) {
    var bestResult = null;
    for (var i = 0; i < a.length - 1; i++) {
        var result = FindIntersectionFromStart(a.substring(i), b);
        if (result) {
            if (!bestResult) {
                bestResult = result;
            } else {
                if (result.length > bestResult.length) {
                    bestResult = result;
                }
            }
        }
        if (bestResult && bestResult.length >= a.length - i)
            break;
    }
    return bestResult;
}
function getParam(sParamName)
// Функция определения переданной переменной
{
var Params = location.search.substring(1).split("?"); 
// отсекаем «?» и вносим переменные и их значения в массив var variable = "";

for (var ij = 0; ij < Params.length; ij++) // просматриваем весь массив переменных
  { 
        if (Params[ij].split("=")[0] == sParamName) // если найдена искомая переменная, и
       { 
           if (Params[ij].split("=").length > 1) variable = Params[ij].split("=")[1];
           // если значение параметра задано, то 
           return variable; // возвращаем его
       }
   }
   return "";
}

 $(document).ready(function() {
          $("a.dropdown-toggle").click(function(ev) {
              $("a.dropdown-toggle").dropdown("toggle");
              return false;
          });
          $("ul.dropdown-menu a").click(function(ev) {
              $("a.dropdown-toggle").dropdown("toggle");
              return false;
          });
      });

//обновление списков (при добавлении подредачить)
function refreshList(tab) {
    if(tab > 3) return;
    var nameList = "listTab" + tab;
    var lists = document.getElementsByName(nameList);

    for(ii = 0; ii < lists.length; ii++) {
        lists[ii].innerHTML = "";
    }
    for(jj = 0; jj < objects.length; jj++){
        if((tab == 1) || (tab == 2 && !objects[jj].isOnRelDiagram) || (tab == 3 && !objects[jj].isOnER)) {
            lists[0].options[lists[0].options.length] = new Option(objects[jj].name);
        }
    }
    return;
}

//поиск объекта по имени
function findIndByObjName(nameObj) {
    for (q = 0; q < objects.length; q++) {
        if(nameObj.trim() == objects[q].name.trim()) return q;
    }
    return -1;
}
