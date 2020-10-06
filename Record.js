nj.config.printThreshold = 1000;
var currentSample = 0;
var numSamples = 100;

var framesOfData = nj.zeros([5,4,6,numSamples]);

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
        RecordData()


        previousNumHands = currentNumHands;
    }
);

function HandleFrame(frame) {

    if (frame.hands.length === 1 || frame.hands.length === 2){
        var hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;

        HandleHand(hand, InteractionBox)
    }
}
function HandleHand(hand, InteractionBox) {

    var finger = hand.fingers;
    var i;

    for (i = 3; i >=0; i--){
        var w = 1;

        //var j = 0;
        finger.forEach(function(finger){
            var bone = finger.bones;
            var fingerIndex = finger.type;

            HandleBone(bone[i], w, fingerIndex, InteractionBox);
        });
    }
}

function HandleBone(bone, w, fingerIndex, InteractionBox){

    var normalizedPrevJoint = InteractionBox.normalizePoint(bone.prevJoint, true);
    var normalizedNextJoint = InteractionBox.normalizePoint(bone.nextJoint, true);

    // console.log(normalizedPrevJoint);

    //coords for tips of each bone
    xTip = normalizedPrevJoint[0]; //bone.nextJoint[0];
    yTip = normalizedPrevJoint[1]; //bone.nextJoint[1];
    zTip = normalizedPrevJoint[2];

    // [xTip,yTip] = TransformCoordinates(xTip,yTip);

    //coords for base of each bone
    xBase = normalizedNextJoint[0]; //bone.prevJoint[0];
    yBase = normalizedNextJoint[1]; //bone.prevJoint[1];
    zBase = normalizedNextJoint[2];


    // console.log(canvasXNext);


    framesOfData.set(fingerIndex, bone.type, 0, currentSample, xTip);
    framesOfData.set(fingerIndex, bone.type, 1, currentSample, yTip);
    framesOfData.set(fingerIndex, bone.type, 2, currentSample, zTip);
    framesOfData.set(fingerIndex, bone.type, 3, currentSample, xBase);
    framesOfData.set(fingerIndex, bone.type, 4, currentSample, yBase);
    framesOfData.set(fingerIndex, bone.type, 5, currentSample, zBase);


    var canvasX1 = window.innerWidth * xTip;
    var canvasY1 = window.innerHeight * (1 - yTip);

    var canvasX2 = window.innerWidth * xBase;
    var canvasY2 = window.innerHeight * (1 - yBase);

    // [xBase,yBase] = TransformCoordinates(xBase,yBase);
   // var sum = xTip + yTip + zTip + xBase + yBase + zBase;


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

    line(canvasX1, canvasY1, canvasX2, canvasY2);
}

function RecordData(){
    if (previousNumHands === 2 && currentNumHands === 1){
        background(51);

        console.log(framesOfData.toString())
        // console.log(framesOfData.pick(null,null,null,0).toString());
        // console.log(framesOfData.pick(null,null,null,1).toString());

        }
    if (currentNumHands === 2){
        currentSample++;
        // console.log(currentSample);
        if (currentSample === numSamples) {
            currentSample = 0;

        }

        console.log(framesOfData.toString())
        console.log(currentSample);
    }
}
