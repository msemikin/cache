//создавать селект в яваскрипте
var objects = new Array();
var listObjLen = objects.length;
var objSt = new Array();


function addObj()
{
    var text_pre = document.getElementById("wordTextBox").value;
    var text = text_pre[0].toUpperCase() + text_pre.substr(1, text_pre.length);
    if (text.length != 0 && text.length != 1) {
        var select = document.getElementById("List1");
        select.options[select.options.length] = new Option(text);
        var attributes = new Array();
        var obj = {
            name: text,
            attr: attributes
        }
        objects.push(obj);
        objSt.push(text);
    }

    cleanTextBox('wordTextBox');
}

function addAttr()
{
    var objIndex = document.getElementById("List1").selectedIndex;
    if(objIndex == -1) alert('Выберите объект!');

    var attr_pre = document.getElementById("attrBox").value;
    var attrtext = attr_pre[0].toUpperCase() + attr_pre.substr(1, attr_pre.length);
    var obj = objects[objIndex];
    if (attrtext.length != 0 && attrtext.length != 1) {
        obj.attr.push(attrtext);
    }
    refreshAttr();
    cleanTextBox('attrBox');
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
    var objIndex = select.selectedIndex;
    var delIn = objSt.indexOf(select[objIndex].text);
    if (delIn > -1) objSt.splice(delIn,1);
    objects.splice(objIndex,1);
    select[objIndex].remove();
    clean('List2');
}

function deleteAttribute()
{
    var select = document.getElementById("List2");
    var objIndex = document.getElementById("List1").selectedIndex;
    var attrIndex = document.getElementById("List2").selectedIndex;
    select[attrIndex].remove();
    objects[objIndex].attr.splice(attrIndex,1);
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




























