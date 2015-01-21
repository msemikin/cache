var tabs = document.getElementsByName("tab");
var contentDivs = document.getElementsByName("contentDiv");

window.onload = function() {
    for (i = 0; i < tabs.length; i++){
        tabs[i].onclick = changeTab;
        var bordWhite = document.createElement('div');
        bordWhite.className = "bottomWhite";
        contentDivs[i].className = "contentDiv";
        if(i!=0) {
            contentDivs[i].style.visibility = "hidden";
            bordWhite.style.visibility = "hidden";
        }
        tabs[i].appendChild(bordWhite);
    }
}

function changeTab() {
    for(j = 0; j < tabs.length; j++){
        if(this == tabs[j])
        {
            tabs[j].setAttribute("class", "chosenTab");
            contentDivs[j].style.visibility = "visible";
            if(j!=0) tabs[j-1].setAttribute("class", "left-tab");
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
