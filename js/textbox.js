//создавать селект в яваскрипте
var objects = new Array();
var listObjLen = objects.length;
var objSt = new Array();


function addToObjectsList ()
{
    var text = document.getElementById("wordTextBox").value;
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

}

function addAttrToObject()
{
    var objIndex = document.getElementById("List1").selectedIndex;
    var attr = document.getElementById("attrBox").value;
    var obj = objects[objIndex];
    if (attr.length != 0 && attr.length != 1) {
        obj.attr.push(attr);
    }
}

function addToAttrList()
{
    var ind = document.getElementById("List1").selectedIndex;
    if(ind == null)
        alert('Выберите объект!');
    var mas = objects[ind].attr;
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




























