var controllerOptions = {};
var rawXMin = 1500;
var rawXMax = 0;
var rawYMin = 1500;
var rawYMax = 0;

var previousNumHands = 0;
var currentNumHands = 0;


Leap.loop(controllerOptions, function(frame) {

        currentNumHands = frame.hands.length;

        // console.log(previousNumHands);
        // console.log(currentNumHands);

        clear();
        HandleFrame(frame);

        previousNumHands = currentNumHands;
    }
);

function HandleFrame(frame) {
    if (frame.hands.length === 1 || frame.hands.length === 2){
        var hand = frame.hands[0];
        HandleHand(hand)
    }
}
function HandleHand(hand) {

    var finger = hand.fingers;
    var i;

    for (i = 3; i >=0; i--){
        var w = 1;
        //var j = 0;
        finger.forEach(function(finger){
            var bone = finger.bones;
            HandleBone(bone[i], w);
        });
    }
}

function HandleBone(bone, w){
    //coords for tips of each bone
    xTip = bone.nextJoint[0];
    yTip = window.innerHeight - bone.nextJoint[1];
    zTip = bone.nextJoint[2];

    [xTip,yTip] = TransformCoordinates(xTip,yTip)

    //coords for base of each bone
    xBase = bone.prevJoint[0];
    yBase = window.innerHeight - bone.prevJoint[1];
    zBase = bone.prevJoint[2];

    [xBase,yBase] = TransformCoordinates(xBase,yBase)

    if(bone.type === 0){
        w = 30;
        if(currentNumHands == 1){        //if only 1 hand shows up, make the lines green
            stroke('rgb(124,252,0)');
        }else if(currentNumHands == 2){                           // else 2 hands, make lines red
            stroke('rgb(255,0,0)')
        }
        strokeWeight(w);
    }else if(bone.type === 1){
        w = 20;
        if(currentNumHands == 1){
            stroke('rgb(50,205,50)');
        }else if(currentNumHands == 2){
            stroke('rgb(220,20,60)');
        }
        strokeWeight(w);
    }else if(bone.type === 2){
        w = 10;
        if(currentNumHands == 1){
            stroke('rgb(34,139,34)');
        }else if(currentNumHands == 2){
            stroke('rgb(178,34,34)');
        }
        strokeWeight(w);
    }else if(bone.type === 3){   // distal part
        w = 1;
        if(currentNumHands == 1){
            stroke('rgb(0,100,0)');
        }else if(currentNumHands == 2){
            stroke('rgb(139,0,0)');
        }
        strokeWeight(w);
    }

    line(xTip, yTip, xBase, yBase)
    //circle(outputX, outputY, 100);
}

function TransformCoordinates(x,y){
    if (x < rawXMin) {
        rawXMin = x;
    }
    if (x > rawXMax) {
        rawXMax = x;
    }
    if (y < rawYMin) {
        rawYMin = y;
    }
    if (y > rawYMax) {
        rawYMax = y;
    }

    x = ((x - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth);
    y = ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerHeight);

    return [x,y];
}