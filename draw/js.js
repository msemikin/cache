var figures = [];

var start = function(){
    this.data("oldt", this.transform().string);
};
var move = function(dx,dy){
    var values = this.data("oldt").split(/[t,]/).filter( function(el, index, arr){
        return el ? true : false;
    });
    oldx = parseInt(values[0] || 0);
    oldy = parseInt(values[1] || 0);
    var newDx = dx + oldx;
    var newDy = dy + oldy;
    console.log([newDx, newDy]);
    this.transform("t"+newDx+","+newDy);
};
var up = function(){
};

function main(){
    
    var snap = Snap("#canvas");
    
    $(".figure").on("click", function(){
        var figure = snap.rect(50,50,50, 50);
        figure.drag(move,start,up);
        figure.attr({
            fill: "white",
            stroke: "black",
            strokeWidth: 2
        });
        figures.push(figure);
    });
}