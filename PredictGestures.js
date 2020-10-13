const knnClassifier = ml5.KNNClassifier();

var numSamples = 0;
var trainingCompleted = false;

var testingSampleIndex = 0;

var predictedClassLabels = nj.zeros([150]);
var controllerOptions = {};
var framesOfData = nj.zeros([5,4,6]);

var accuracy = 0;
var m = 0;
var n = 0;

// var predictedClassLabels = nj.zeros([numSamples]);

function Train(){

    // console.log(train0);
    // console.log(test);

    var i;
    for(i = 0; i < trainX.shape[3]; i++){
        //console.log( train0.pick(null,null,null,i).toString() );
        var features = trainX.pick(null,null,null,i).reshape(1, 120);
        var features1 = trainY.pick(null,null,null,i).reshape(1, 120);
        // console.log(features.toString());


        knnClassifier.addExample(features.tolist(), 7);
        knnClassifier.addExample(features1.tolist(), 8);
    }
    // console.log(train0.shape[3]); //gives 2

}

function Test(){

    CenterData();

    var currentTestingSample = framesOfData.pick(null,null,null,testingSampleIndex).reshape(1, 120);
    var predictedLabel = knnClassifier.classify(currentTestingSample.tolist(), GotResults);

    var c = predictedClassLabels.get(testingSampleIndex);
    var d = 7;
    n++;

    m = ((n-1) * m + (c == d))/n;
    // console.log(n + ", " + m + ", " + c);


    //console.log(testingSampleIndex + "---" + predictedClassLabels.get(testingSampleIndex));
}

function GotResults(err, result){

    testingSampleIndex +=1;

    if (testingSampleIndex > trainY.shape[3]-1){
        testingSampleIndex = 0;
    }

    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    // console.log(parseInt(result.label));
}

Leap.loop(controllerOptions, function(frame){
    // console.log(irisData.toString())
    // console.log(numSamples);
    currentNumHands = frame.hands.length;
    clear();

    HandleFrame(frame);

    if (trainingCompleted === false){
        Train();
        trainingCompleted = true;
    }
});

function HandleFrame(frame) {

    if (frame.hands.length === 1 || frame.hands.length === 2){
        var hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;

        HandleHand(hand, InteractionBox);

        //console.log(framesOfData.toString());
        Test();
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

    //coords for tips of each bone
    xTip = normalizedPrevJoint[0]; //bone.nextJoint[0];
    yTip = normalizedPrevJoint[1]; //bone.nextJoint[1];
    zTip = normalizedPrevJoint[2];

    //coords for base of each bone
    xBase = normalizedNextJoint[0]; //bone.prevJoint[0];
    yBase = normalizedNextJoint[1]; //bone.prevJoint[1];
    zBase = normalizedNextJoint[2];

    framesOfData.set(fingerIndex, bone.type, 0, xTip);
    framesOfData.set(fingerIndex, bone.type, 1, yTip);
    framesOfData.set(fingerIndex, bone.type, 2, zTip);
    framesOfData.set(fingerIndex, bone.type, 3, xBase);
    framesOfData.set(fingerIndex, bone.type, 4, yBase);
    framesOfData.set(fingerIndex, bone.type, 5, zBase);

    var canvasX1 = window.innerWidth * xTip;
    var canvasY1 = window.innerHeight * (1 - yTip);

    var canvasX2 = window.innerWidth * xBase;
    var canvasY2 = window.innerHeight * (1 - yBase);

    if(bone.type === 0){
        w = 30;
        if(currentNumHands == 1){        //if only 1 hand shows up, make the lines green
            stroke('rgb(166,166,166)');
        }else if(currentNumHands == 2){                           // else 2 hands, make lines red
            stroke('rgb(166,166,166)');
        }
        strokeWeight(w);
    }else if(bone.type === 1){
        w = 20;
        if(currentNumHands == 1){
            stroke('rgb(141,141,141)');
        }else if(currentNumHands == 2){
            stroke('rgb(141,141,141)');
        }
        strokeWeight(w);
    }else if(bone.type === 2){
        w = 10;
        if(currentNumHands == 1){
            stroke('rgb(115,115,115)');
        }else if(currentNumHands == 2){
            stroke('rgb(115,115,115)');
        }
        strokeWeight(w);
    }else if(bone.type === 3){   // distal part
        w = 1;
        if(currentNumHands == 1){
            stroke('rgb(90,90,90)');
        }else if(currentNumHands == 2){
            stroke('rgb(90,90,90)');
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

        console.log(framesOfData.toString());
        console.log(currentSample);
    }
}

function  CenterData() {


}