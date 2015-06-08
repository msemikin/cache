var i = 1;

 function addConstr(){
            //alert();
            var constr = document.getElementsByClassName("constraintPanel")[0];
            var list = document.getElementById("constraintList");
            var constr2 = constr.cloneNode(true);
            var c = "constraint_"+i+"_element";
            i++;
            constr2.setAttribute("Id", c);
            list.appendChild(constr2);
            //alert(i);
            //var but = document.getElementsByClassName("btn btn-default btn-small remove").[i-1];
            //var b = "constraint_"+i;
            //but.setAttribute("Id", b);
        }
function test()
{
    alert();
}

