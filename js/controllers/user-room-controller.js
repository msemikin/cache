var userId ="";
window.onload = function () {
	userId = getParam("result");
	if (userId != "") {
	$.get("http://localhost:57772/csp/rest/json/getuser/"+userId, function(data, status){
		var obj = JSON.parse(data);
		if (obj.children.length !=0) {
		user = obj;
		setContent(user);
			document.getElementById("userNameText").innerHTML = decode(user.children[0].name) + " " + decode(user.children[0].surname);
		}
		else {
			window.location = "http://localhost:57772/csp/user/git/pg/registration.html";
		}
        });
	}
	else {
		window.location = "http://localhost:57772/csp/user/git/pg/registration.html";
	}
}


function getParam(sParamName)
{
var Params = location.search.substring(1).split("?"); 

for (var ij = 0; ij < Params.length; ij++) 
  { 
        if (Params[ij].split("=")[0] == sParamName)
       { 
           if (Params[ij].split("=").length > 1) variable = Params[ij].split("=")[1];
           return variable; 
       }
   }
   return "";
}
function setContent(user) {
	createButtons(user.children[0].projects);
}

 

function createButtons(projects) {
	if (projects.length == 0) {
		
	}
} 
