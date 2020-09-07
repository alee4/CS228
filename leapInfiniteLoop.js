
var controllerOptions = {};
//var i = 0;
var x = (window.innerWidth)/2;
var y = (window.innerHeight)/2;
var ranNumX;
var ranNumY;

Leap.loop(controllerOptions, function(frame) {

    clear();
    ranNumX = Math.floor(Math.random() * 2) -1;
    ranNumY = Math.floor(Math.random() * 2) -1;
    //console.log(i)
    circle(x + ranNumX,y + ranNumY,100);
    }
);