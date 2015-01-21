var tabs = document.getElementsByName("tab");
var contentDivs = document.getElementsByName("contentDiv");

window.onload = function() {
    for (i = 0; i < tabs.length; i++){
        tabs[i].onclick = changeTab;
        contentDivs[i].className = "contentDiv";
        if(i!=0) contentDivs[i].style.visibility = "hidden";
    }
}

function changeTab() {
    for(j = 0; j < tabs.length; j++){
        tabs[j].setAttribute("class", "tab");
        contentDivs[j].style.visibility = "hidden";
        if(this == tabs[j])
        {
            tabs[j].setAttribute("class", "chosenTab");
            contentDivs[j].style.visibility = "visible";
            if(j!=0) tabs[j-1].setAttribute("class", "left-tab");
        }
    }

}
