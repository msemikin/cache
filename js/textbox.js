//создавать селект в яваскрипте
var objects = new Array();
var listObjLen = objects.length;

function putInBox (val)
{
    var TheTextBox = document.getElementById("wordTextBox");
    TheTextBox.value = val;
}

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
    }

}

function addAttrToObject()
{
    var objIndex = document.getElementById("List1").selectedIndex;
    //var objIndex = document.getElementById("newBox1").value;
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

//добавить кнопочки удаления
function deleteObject()
{
    //debugger;
    var select = document.getElementById("List1");
    var objIndex = document.getElementById("List1").selectedIndex;
    objects.splice(objIndex,1);
    clean('List1');
    clean('List2');
    for(i = 0;i < objects.length;i++)
    {
        select.options[select.options.length] = new Option(objects[i].name);
    }

}

function deleteAttribute()
{
    //debugger;
    var select = document.getElementById("List2");
    var objIndex = document.getElementById("List1").selectedIndex;
    var attrIndex = document.getElementById("List2").selectedIndex;

    objects[objIndex].attr.splice(attrIndex,1);
    addToAttrList();
}

function clean(list)
{
    var select = document.getElementById(list);
    select.innerHTML = "";
}

function cleanTextBox(name)
{
    var textBox = document.getElementById(name);
    textBox.value = " ";
}

function delButton()
{
    //debugger;
    A=document.createElement("div");
    add(A, 'button');

    var select = document.getElementById("List1");
    select.appendChild(A);
}

function add(elem, type) {
    //Create an input type dynamically.
    var element = document.createElement("input");
    //Assign different attributes to the element.
    element.type = type;
    //element.id = '1';
    element.setAttribute('class', 'delObjButton');
    elem.appendChild(element);
    //element.value = type; // Really? You want the default value to be the type string?
    //element.name = type;  // And the name too?
    //element.setAttribute("onclick", deleteObject());


}

































