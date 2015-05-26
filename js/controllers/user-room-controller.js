var userId ="";
window.onload = function () {
	var user = JSON.parse($.cookie("session"));
	document.getElementById("userNameText").innerHTML = decode(user.children[0].name) + " " + decode(user.children[0].surname);
}

function createButtons(projects) {
	if (projects.length == 0) {
		
	}
} 
