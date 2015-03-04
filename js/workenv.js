var tabs = document.getElementsByName("tab");
var contentDivs = document.getElementsByName("contentDiv");

window.onload = function() {

    var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    $('#pages-container').text(text);

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
    function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }
    $(document).ready(function (){
         $('#pages-container').click(function (e){
             getSelectionHtml();
         })
    });
    function getSelectionHtml() {
        var html = "";
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        var intersection = FindIntersection(html, $('#pages-container').text());
        if(intersection) {
            html = $('#pages-container').text().slice(intersection.position,intersection.position + intersection.length);
        }
        if(html) {
            window.alert(html)
        }
    }
    var field = document.getElementById('file-field');
    field.onchange = function (e) {
        jDoc.read(e.target.files[0], {
            success:
            function (parsedFile) {
                var canvas = document.getElementById("pages-container");
                canvas.innerHTML = "";
                canvas.appendChild(parsedFile.html());
                var textLikeObject = parsedFile.data();
                console.log(textLikeObject);
            },

            error:
            function (error) {
                console.log(error);
            }
        });
    };
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

function FindIntersectionFromStart(a,b){
    for(var i=a.length;i>0;i--){
        d = a.substring(0,i);
        j = b.indexOf(d);
        if (j>=0){
            return ({position:j,length:i});
        }
    }

    return null;
}
    
function FindIntersection(a,b){
    var bestResult = null;
    for(var i=0;i<a.length-1;i++){
        var result = FindIntersectionFromStart(a.substring(i),b);
        if (result){
            if (!bestResult){
                bestResult = result;
            } else {
                if (result.length>bestResult.length){
                    bestResult = result;
                }
            }
        }
        if(bestResult && bestResult.length>=a.length-i)
            break;
    }
    return bestResult;
}