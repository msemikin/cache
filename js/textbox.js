function putInBox (val)
{
    var TheTextBox = document.getElementById("wordTextBox");
    TheTextBox.value = val;
}

function putInList ()
{
    var text = document.getElementById("wordTextBox").value;
    var select = document.getElementById("List1");
    select.options[select.options.length] = new Option(text);
}

function addToAttr(obj, atr)
{
    var syncList1 = new syncList;

    //var List1 = document.getElementById("List1");
    //var List2 = document.getElementById("List2");
    //select.options
    // syncList1.dataList = { obj :{ obj

}

function linkedLists()
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
}

