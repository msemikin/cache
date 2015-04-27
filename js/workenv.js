var field;
var tabs;
var contentDivs;
var textObj;
var canvas;
var index;


window.onload = function () {
    contentDivs = document.getElementsByName("contentDiv");
    tabs = document.getElementsByName("tab");
    canvas = document.getElementById("pages-container");
    field = document.getElementById('file-field');


    for (i = 0; i < tabs.length; i++) {
        tabs[i].onclick = changeTab;
        var bordWhite = document.createElement('div');
        bordWhite.className = "bottomWhite";
        contentDivs[i].className = "contentDiv";
        if (i != 0) {
            contentDivs[i].style.visibility = "hidden";
            bordWhite.style.visibility = "hidden";
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


    /*function addToObjectsList(text) {
        //var text = document.getElementById("wordTextBox").value;
        if (text.length != 0 && text.length != 1) {
            var select = document.getElementById("List1");
            select.options[select.options.length] = new Option(text);
            var attributes = new Array();
            var obj = {
                name: text,
                attr: attributes
            }
            objects.push(obj);
        }
    }

    function addAttrToObject(attr) {
        var objIndex = document.getElementById("List1").selectedIndex;
        //var objIndex = document.getElementById("newBox1").value;
        //var attr = document.getElementById("attrBox").value;
        var obj = objects[objIndex];
        if (attr.length != 0 && attr.length != 1) {
            obj.attr.push(attr);
        }
    }

    function addToAttrList() {
        var ind = document.getElementById("List1").selectedIndex;
        index = ind;
        var mas = objects[ind].attr;
        var select = document.getElementById("List2");
        clean('List2');
        for (i = 0; i < mas.length; i++) {
            select.options[select.options.length] = new Option(mas[i]);
        }
    }*/


    //удаление объекта
    $(function(){
        $("#List1").bind("dblclick", function(){
            var element = $("#List1 option:selected");
            deleteObject();
            clean('List2');
        });
    });

    //удаление атрибута
    $(function(){
        $("#List2").bind("dblclick", function(){
            deleteAttribute();
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


/*function linkedLists()
 {
 var syncList1 = new syncList;

 syncList1.dataList = {

 'Obj1':{
 'Obj1_Attr1.1':'Attr1.1',
 'Obj1_Attr1.2':'Attr1.2',
 'Obj1_Attr1.3':'Attr1.3'
 },
 'Obj2':{
 'Obj2_Attr2.1':'Attr2.1',
 'Obj2_Attr2.2':'Attr2.2'
 }
 };
 syncList1.sync("List1","List2");
 }*/


//Переключение вкладок
function changeTab() {
    for (j = 0; j < tabs.length; j++) {
        if (this == tabs[j]) {
           // if(j == 2) getList();
            tabs[j].setAttribute("class", "chosenTab");
            contentDivs[j].style.visibility = "visible";
            if (j != 0) tabs[j - 1].setAttribute("class", "left-tab");
            for (var t = 0; t < tabs[j].childNodes.length; t++) {
                if (tabs[j].childNodes[t].className == "bottomWhite") {
                    tabs[j].childNodes[t].style.visibility = "visible";
                    break;
                }
            }
        }
        else {
            tabs[j].setAttribute("class", "tab");
            contentDivs[j].style.visibility = "hidden";
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

//отображение спика объектов во второй вкладке
/*function getList() {
    var sel = document.getElementById("List3");
    sel.innerHTML = "";
    for (z = 0; z < objSt.length; z++){
        sel.options[z] = new Option(objSt[z]);
    }
}*/

