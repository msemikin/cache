var tabs = document.getElementsByName("tab");

window.onload = function() {
    for(i = 0; i < tabs.length; i++){
        tabs[i].onclick = changeTab;
    }
}

function changeTab() {
    for(j = 0; j < tabs.length; j++){
        tabs[j].setAttribute("class", "tab");
        if(this == tabs[j])
        {
            tabs[j].setAttribute("class", "chosenTab");
            if(j!=0) tabs[j-1].setAttribute("class", "left-tab");
        }
    }

}
