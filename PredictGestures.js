const knnClassifier = ml5.KNNClassifier();

var numSamples = 0;
var trainingCompleted = false;
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros([150]);
var controllerOptions = {};
var framesOfData = nj.zeros([5,4,6]);

var accuracy = 0;
var m = 1;
var n = 0;

var programState = 0 ;

// var predictedClassLabels = nj.zeros([numSamples]);
Leap.loop(controllerOptions, function(frame){
    clear();

    DetermineState(frame);
    if (programState==0) {
        HandleState0(frame);
    }
    else if (programState==1) {
        HandleState1(frame);

    }else{
        HandleState2(frame)
    }

    // currentNumHands = frame.hands.length;
    // if (trainingCompleted === false){
    //     // Train();
    //     trainingCompleted = true;
    // }
    HandleFrame(frame);
});

function Train(){
    console.log("Training...");
    var i;
    for(i = 0; i < trainX.shape[3]; i++){

        // //console.log( train0.pick(null,null,null,i).toString() );
        // //~~~~~~~~~~~~~~~~~~~~~~Features~~~~~~~~~~~~~~~~~~~~~~~~~
        // //features 0
        // var features0 = train0.pick(null,null,null,i).reshape(1, 120);
        // var features0Part2 = train0Bongard.pick(null,null,null,i).reshape(1, 120);
        //
        // //features 1
        // var features1 = train1.pick(null,null,null,i).reshape(1, 120);
        // var features1Part2 = train1Bongard.pick(null,null,null,i).reshape(1, 120);
        // var features1Part3 = train1Allison.pick(null,null,null,i).reshape(1, 120);
        //
        // //features 2
        // var features2 = train2.pick(null,null,null,i).reshape(1, 120);
        // var features2Part2 = train2Bongard.pick(null,null,null,i).reshape(1, 120);
        // var features2Part3 = train2Jimmo.pick(null,null,null,i).reshape(1, 120);
        // var features2Part4 = train2Neff.pick(null,null,null,i).reshape(1, 120);
        //
        //
        // //features 3
        // var features3 = train3.pick(null,null,null,i).reshape(1, 120);
        // var features3Part2 = train3Bongard.pick(null,null,null,i).reshape(1, 120);
        // var features3Part3 = train3Jing.pick(null,null,null,i).reshape(1, 120);
        // var features3Part4 = train3Li.pick(null,null,null,i).reshape(1, 120);
        // var features3Part5 = train3Riofrio.pick(null,null,null,i).reshape(1, 120);
        // var features3Part6 = train3AustinLee.pick(null,null,null,i).reshape(1, 120);
        //
        // // features 4
        // var features4 = train4.pick(null,null,null,i).reshape(1, 120);
        // var features4Part2 = train4Bongard.pick(null,null,null,i).reshape(1, 120);
        //
        // //features 5
        // var features5 = train5.pick(null,null,null,i).reshape(1, 120);
        // var features5Part2 = train5Bongard.pick(null,null,null,i).reshape(1, 120);
        //
        // //features 6
        // var features6 = train6.pick(null,null,null,i).reshape(1, 120);
        // var features6Part2 = train6Bongard.pick(null,null,null,i).reshape(1, 120);
        // var features6Part3 = train6AustinLee.pick(null,null,null,i).reshape(1, 120);
        // var features6Part4 = train6Fekert.pick(null,null,null,i).reshape(1, 120);
        //
        // //features 7 (my data)
        // var features7 = trainX.pick(null,null,null,i).reshape(1, 120);
        // var features7Part2 = train7Bongard.pick(null,null,null,i).reshape(1, 120);
        //
        // //features 8 (my data)
        // var features8 = trainY.pick(null,null,null,i).reshape(1, 120);
        // var features8Part2 = train8Bongard.pick(null,null,null,i).reshape(1, 120);
        // var features8Part3 = train8AustinLee.pick(null,null,null,i).reshape(1, 120);
        // var features8Part4 = train8Goldman.pick(null,null,null,i).reshape(1, 120);
        //
        // //features 9
        // var features9 = train9.pick(null,null,null,i).reshape(1, 120);
        //
        // //~~~~~~~~~~~~~~~~~~~~~~~~KNNs~~~~~~~~~~~~~~~~~~~~~~~~~
        // // knn 0
        // knnClassifier.addExample(features0.tolist(), 0);
        // knnClassifier.addExample(features0Part2.tolist(), 0);
        // //knn 1
        // knnClassifier.addExample(features1.tolist(), 1);
        // knnClassifier.addExample(features1Part2.tolist(), 1);
        // knnClassifier.addExample(features1Part3.tolist(), 1);
        //
        // //knn 2
        // knnClassifier.addExample(features2.tolist(), 2);
        // knnClassifier.addExample(features2Part2.tolist(), 2);
        // knnClassifier.addExample(features2Part3.tolist(), 2);
        // knnClassifier.addExample(features2Part4.tolist(), 2);
        //
        // //knn 3
        // knnClassifier.addExample(features3.tolist(), 3);
        // knnClassifier.addExample(features3Part2.tolist(), 3);
        // knnClassifier.addExample(features3Part3.tolist(), 3);
        // knnClassifier.addExample(features3Part4.tolist(), 3);
        // // knnClassifier.addExample(features3Part5.tolist(), 3);
        // knnClassifier.addExample(features3Part6.tolist(), 3);
        //
        // //knn 4
        // knnClassifier.addExample(features4.tolist(), 4);
        // knnClassifier.addExample(features4Part2.tolist(), 4);
        //
        // //knn 5
        // knnClassifier.addExample(features5.tolist(), 5);
        // knnClassifier.addExample(features5Part2.tolist(), 5);
        //
        // //knn 6
        // //knnClassifier.addExample(features6.tolist(), 6);
        // knnClassifier.addExample(features6Part2.tolist(), 6);
        // // knnClassifier.addExample(features6Part3.tolist(), 6);
        // knnClassifier.addExample(features6Part4.tolist(), 6);
        //
        // //knn 7
        // knnClassifier.addExample(features7.tolist(), 7);
        // knnClassifier.addExample(features7Part2.tolist(), 7);
        //
        // //knn 8
        // // knnClassifier.addExample(features8.tolist(), 8);
        // // knnClassifier.addExample(features8Part2.tolist(), 8);
        // knnClassifier.addExample(features8Part3.tolist(), 8);
        // // knnClassifier.addExample(features8Part4.tolist(), 8);
        //
        // //knn 9
        // knnClassifier.addExample(features9.tolist(), 9);
    }
    console.log("Done training.")
    // console.log(train0.shape[3]); //gives 2
}

function Test(){
    CenterDataX();
    CenterDataY();
    CenterDataZ();

    // var currentTestingSample = framesOfData.pick(null,null,null,testingSampleIndex).reshape(1, 120);
    // var predictedLabel = knnClassifier.classify(currentTestingSample.tolist(), GotResults);
    // var c = predictedClassLabels.get(testingSampleIndex);
    // var d = 9;
    //
    // n++;
    // m = ((n-1) * m + (c == d))/n;
    //console.log(n + ", " + m + ", " + c);
    // console.log(testingSampleIndex + "---" + predictedClassLabels.get(testingSampleIndex));
}

function HandleFrame(frame) {
    if (frame.hands.length === 1 || frame.hands.length === 2){
        var hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;
        HandleHand(hand, InteractionBox);
        // Test();
    }
}

function HandleHand(hand, InteractionBox) {
    var finger = hand.fingers;
    var i;
    for (i = 3; i >=0; i--){
        var w = 1;
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

    // var canvasX1 = window.innerWidth * xTip;
    // var canvasY1 = window.innerHeight * (1 - yTip);
    //
    // var canvasX2 = window.innerWidth * xBase;
    // var canvasY2 = window.innerHeight * (1 - yBase);

    // var canvasX1 =   xTip;
    // var canvasY1 =  yTip;
    //
    // var canvasX2 = window.innerWidth/2 - xBase;
    // var canvasY2 = window.innerHeight/2 - yBase;

    var canvasX1 = window.innerWidth/2 * xTip;
    var canvasY1 = window.innerHeight/2 * (1 - yTip);

    var canvasX2 = window.innerWidth/2 * xBase;
    var canvasY2 = window.innerHeight/2 * (1 - yBase);

    if(bone.type === 0){
        w = 30;
        if(currentNumHands == 1){                                 //if only 1 hand shows up, make the lines green
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

function GotResults(err, result){
    testingSampleIndex +=1;
    if (testingSampleIndex >= trainX.shape[3]){
        testingSampleIndex = 0;
    }
    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    console.log(predictedClassLabels.get(testingSampleIndex));
}

function  CenterDataX() {
    xValues = framesOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();
    var horizontalShift = 0.5 - currentMean;
    currentMean = xValues.mean();

    for (var currentRow = 0; currentRow < xValues.shape[0]; currentRow++){
        for(var currentColumn = 0; currentColumn < xValues.shape[1]; currentColumn++){
            currentX = framesOfData.get(currentRow,currentColumn,0);
            shiftedX = currentX + horizontalShift;
            framesOfData.set(currentRow,currentColumn,0, shiftedX);

            currentX = framesOfData.get(currentRow,currentColumn,3);
            shiftedX = currentX + horizontalShift;
            framesOfData.set(currentRow,currentColumn,3, shiftedX);
        }
    }
    currentMean = xValues.mean();
}

function  CenterDataY() {
    yValues = framesOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();
    var horizontalShift = 0.5 - currentMean;
    currentMean = yValues.mean();

    for (var currentRow = 0; currentRow < yValues.shape[0]; currentRow++){
        for(var currentColumn = 0; currentColumn < yValues.shape[1]; currentColumn++){
            currentY = framesOfData.get(currentRow,currentColumn,1);
            shiftedY = currentY + horizontalShift;
            framesOfData.set(currentRow,currentColumn,1, shiftedY);

            currentY = framesOfData.get(currentRow,currentColumn,4);
            shiftedY = currentY + horizontalShift;
            framesOfData.set(currentRow,currentColumn,4, shiftedX);
        }
    }
    currentMean = yValues.mean();
}

function  CenterDataZ() {
    zValues = framesOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();
    var horizontalShift = 0.5 - currentMean;
    currentMean = zValues.mean();

    for (var currentRow = 0; currentRow < zValues.shape[0]; currentRow++){
        for(var currentColumn = 0; currentColumn < zValues.shape[1]; currentColumn++){
            currentZ = framesOfData.get(currentRow,currentColumn,2);
            shiftedZ = currentY + horizontalShift;
            framesOfData.set(currentRow,currentColumn,2, shiftedZ);

            currentZ = framesOfData.get(currentRow,currentColumn,5);
            shiftedZ = currentY + horizontalShift;
            framesOfData.set(currentRow,currentColumn,5, shiftedZ);
        }
    }
    currentMean = zValues.mean();
}

function DetermineState(frame) {

    currentNumHands = frame.hands.length;

    if (currentNumHands === 0) {  //waiting to see hand
        programState = 0;
        console.log("entered program state 0.")
    }
    else if(HandIsUncentered()){  //hand is present but not centered
        programState = 1;
        console.log("entered program state 1.")
    }
    else{    //else its present and centered
        programState = 2;
        console.log("entered program state 2.")
    }
}

function HandleState0(frame) {
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
    //HandleState1();
}

function TrainKNNIfNotDoneYet () {
    // if (trainingCompleted === false){
    //     // Train();
    //     trainingCompleted = true;
    // }
}

function DrawImageToHelpUserPutTheirHandOverTheDevice() {
    image(img, 0, 0);
}

function HandleState1(frame){
    // f = HandleFrame(frame);
    HandleFrame(frame);
    // Test()
    // if (HandIsTooFarToTheLeft()){
    //     DrawArrowRight();
    //     //console.log("drawing too far to left.")
    // }
    // if(HandIsTooFarToTheRight){
    //     DrawArrowLeft();
    // }
    // if(HandIsTooFarDown){
    //     DrawArrowUp();
    // }
    // if (HandIsTooFarUp){
    //     DrawArrowDown();
    // }
    // if(HandIsTooClose){
    //     DrawArrowAway();
    // }
    // if(HandIsTooFarForward){
    //     DrawArrowToward();
    // }


}

function HandIsUncentered(){
    // if(HandIsTooFarToTheLeft || HandIsTooFarToTheRight){
    //     return true;
    // }
    // return false;

    // console.log("Checking centering...");

    //Hand Not Cenetered Cases
    if (HandIsTooFarToTheLeft()) {
        DrawArrowRight();
        return true;
    }
    else if (HandIsTooFarToTheRight()) {
        DrawArrowLeft();
        return true;
    }
    else if (HandIsTooFarUp()) {
        DrawArrowDown();
        return true;
    }
    else if (HandIsTooFarDown()) {
        DrawArrowUp();
        return true;
    }
    else if (HandIsTooClose()) {
        DrawArrowAway();
        return true;
    }
    else if (HandIsTooFarForward()) {
        DrawArrowToward();
        return true;
    }

    //If pass all, return false
    return false;
}

function HandIsTooFarToTheLeft(){
    var xValues = framesOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();

    //console.log(currentMean);
    if (currentMean < 0.25){
        return true;
    }
    return false;
}

function HandIsTooFarToTheRight(){
    var xValues = framesOfData.slice([],[],[0,6,3]);
    var currentMean = xValues.mean();

    console.log(currentMean);

    if (currentMean > 0.75){
        return true;
    }
    return false;
}

function HandIsTooFarUp(){
    var yValues = framesOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();

    console.log(currentMean);

    if (currentMean > 0.75){
        return true;
    }
    return false;
}

function HandIsTooFarDown(){
    var yValues = framesOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();

    console.log(currentMean);

    if (currentMean< 0.25){
        return true;
    }
    return false;
}

function HandIsTooClose(){
    var zValues = framesOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();

    console.log(currentMean);

    if (currentMean < 0.25){
        return true;
    }
    return false;
}

function HandIsTooFarForward(){
    var zValues = framesOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();

    console.log(currentMean);

    if (currentMean >  0.75){
        return true;
    }
    return false;
}


function DrawArrowRight(){
    image(rightHandImg, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2)
}

function DrawArrowLeft(){
    image(leftHandImg, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2)
}

function DrawArrowDown(){
    image(downHandImg, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2)
}

function DrawArrowUp(){
    image(upleftHandImg, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2)
}

function DrawArrowAway(){
    image(awayleftHandImg, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2)
}

function DrawArrowToward(){
    image(towardleftHandImg, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2)
}

function HandleState2(frame){
    Test();
    if (frame.hands.length === 1 || frame.hands.length === 2){
        var hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;
        HandleHand(hand, InteractionBox);
        // Test();
    }
}

function SignIn(){
    console.log("SignIn() has been called.");
    username = document.getElementById('username').value;
    console.log(username);

    var list = document.getElementById('users');
    var item = document.createElement('li');
    item.innerHTML = String(username);
    list.appendChild(item);
    console.log(list.innerHTML);
    return false;
}