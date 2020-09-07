
var controllerOptions = {};
//var i = 0;
var x = (window.innerWidth)/2;
var y = (window.innerHeight)/2;
var ranNumX;
var ranNumY;
var hand;
var fingers;

Leap.loop(controllerOptions, function(frame) {

    //var arr = new Array(frame.hands);
    // //console.log(frame);
    if (frame.hands.length === 1){
        //console.log(frame.hands[0]);
        hand = frame.hands[0];
        //console.log(hand);
        fingers = hand.fingers;
        console.log(fingers);
    }



    // clear();
    // ranNumX = Math.floor(Math.random() * 2) -1;
    // ranNumY = Math.floor(Math.random() * 2) -1;
    // //console.log(i)
    // circle(x + ranNumX,y + ranNumY,100);
    }
);