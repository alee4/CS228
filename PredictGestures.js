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

var userNumber = 0;

// vars for deliverable 9
var digitToShow = 0;
var timeSinceLastDigitChange = new Date();

//vars for d10
var arrayOfSigns = [2,3,4,5,6,7,8,9];
var signsInUse = [0,1];
var userIsDoingBetterCount = 0;
var lengthOfSignsInUse = 0;
var currentThing = 0;


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
    //     Train();
    //     trainingCompleted = true;
    // }
    HandleFrame(frame);
});

function Train(){
    console.log("Training...");
    var i;
    for(i = 0; i < trainX.shape[3]; i++){

        //console.log( train0.pick(null,null,null,i).toString() );
        //~~~~~~~~~~~~~~~~~~~~~~Features~~~~~~~~~~~~~~~~~~~~~~~~~
        //features 0
        var features0 = train0.pick(null,null,null,i).reshape(1, 120);
        var features0Part2 = train0Bongard.pick(null,null,null,i).reshape(1, 120);

        //features 1
        var features1 = train1.pick(null,null,null,i).reshape(1, 120);
        var features1Part2 = train1Bongard.pick(null,null,null,i).reshape(1, 120);
        var features1Part3 = train1Allison.pick(null,null,null,i).reshape(1, 120);

        //features 2
        var features2 = train2.pick(null,null,null,i).reshape(1, 120);
        var features2Part2 = train2Bongard.pick(null,null,null,i).reshape(1, 120);
        var features2Part3 = train2Jimmo.pick(null,null,null,i).reshape(1, 120);
        var features2Part4 = train2Neff.pick(null,null,null,i).reshape(1, 120);


        //features 3
        var features3 = train3.pick(null,null,null,i).reshape(1, 120);
        var features3Part2 = train3Bongard.pick(null,null,null,i).reshape(1, 120);
        var features3Part3 = train3Jing.pick(null,null,null,i).reshape(1, 120);
        var features3Part4 = train3Li.pick(null,null,null,i).reshape(1, 120);
        var features3Part5 = train3Riofrio.pick(null,null,null,i).reshape(1, 120);
        var features3Part6 = train3AustinLee.pick(null,null,null,i).reshape(1, 120);

        // features 4
        var features4 = train4.pick(null,null,null,i).reshape(1, 120);
        var features4Part2 = train4Bongard.pick(null,null,null,i).reshape(1, 120);

        //features 5
        var features5 = train5.pick(null,null,null,i).reshape(1, 120);
        var features5Part2 = train5Bongard.pick(null,null,null,i).reshape(1, 120);

        //features 6
        var features6 = train6.pick(null,null,null,i).reshape(1, 120);
        var features6Part2 = train6Bongard.pick(null,null,null,i).reshape(1, 120);
        var features6Part3 = train6AustinLee.pick(null,null,null,i).reshape(1, 120);
        var features6Part4 = train6Fekert.pick(null,null,null,i).reshape(1, 120);

        //features 7 (my data)
        var features7 = trainX.pick(null,null,null,i).reshape(1, 120);
        var features7Part2 = train7Bongard.pick(null,null,null,i).reshape(1, 120);

        //features 8 (my data)
        var features8 = trainY.pick(null,null,null,i).reshape(1, 120);
        var features8Part2 = train8Bongard.pick(null,null,null,i).reshape(1, 120);
        var features8Part3 = train8AustinLee.pick(null,null,null,i).reshape(1, 120);
        var features8Part4 = train8Goldman.pick(null,null,null,i).reshape(1, 120);

        //features 9
        var features9 = train9.pick(null,null,null,i).reshape(1, 120);

        //~~~~~~~~~~~~~~~~~~~~~~~~KNNs~~~~~~~~~~~~~~~~~~~~~~~~~
        // knn 0
        knnClassifier.addExample(features0.tolist(), 0);
        knnClassifier.addExample(features0Part2.tolist(), 0);
        //knn 1
        knnClassifier.addExample(features1.tolist(), 1);
        knnClassifier.addExample(features1Part2.tolist(), 1);
        knnClassifier.addExample(features1Part3.tolist(), 1);

        //knn 2
        knnClassifier.addExample(features2.tolist(), 2);
        knnClassifier.addExample(features2Part2.tolist(), 2);
        knnClassifier.addExample(features2Part3.tolist(), 2);
        knnClassifier.addExample(features2Part4.tolist(), 2);

        //knn 3
        knnClassifier.addExample(features3.tolist(), 3);
        knnClassifier.addExample(features3Part2.tolist(), 3);
        knnClassifier.addExample(features3Part3.tolist(), 3);
        knnClassifier.addExample(features3Part4.tolist(), 3);
        // knnClassifier.addExample(features3Part5.tolist(), 3);
        knnClassifier.addExample(features3Part6.tolist(), 3);

        //knn 4
        knnClassifier.addExample(features4.tolist(), 4);
        knnClassifier.addExample(features4Part2.tolist(), 4);

        //knn 5
        knnClassifier.addExample(features5.tolist(), 5);
        knnClassifier.addExample(features5Part2.tolist(), 5);

        //knn 6
        //knnClassifier.addExample(features6.tolist(), 6);
        knnClassifier.addExample(features6Part2.tolist(), 6);
        // knnClassifier.addExample(features6Part3.tolist(), 6);
        knnClassifier.addExample(features6Part4.tolist(), 6);

        //knn 7
        knnClassifier.addExample(features7.tolist(), 7);
        knnClassifier.addExample(features7Part2.tolist(), 7);

        //knn 8
        // knnClassifier.addExample(features8.tolist(), 8);
        // knnClassifier.addExample(features8Part2.tolist(), 8);
        knnClassifier.addExample(features8Part3.tolist(), 8);
        // knnClassifier.addExample(features8Part4.tolist(), 8);

        //knn 9
        knnClassifier.addExample(features9.tolist(), 9);
    }
    console.log("Done training.")
    // console.log(train0.shape[3]); //gives 2
}

function Test(){
    CenterDataX();
    CenterDataY();
    CenterDataZ();

    var currentTestingSample = framesOfData.pick(null,null,null,testingSampleIndex).reshape(1, 120);
    var predictedLabel = knnClassifier.classify(currentTestingSample.tolist(), GotResults);

    // console.log(testingSampleIndex + "---" + predictedClassLabels.get(testingSampleIndex));
}

function HandleFrame(frame) {
    if (frame.hands.length === 1 || frame.hands.length === 2){
        var hand = frame.hands[0];
        var InteractionBox = frame.interactionBox;
        HandleHand(hand, InteractionBox);
        Test();
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

    var multiplierGreen = m;
    var multiplierRed = (m*255);
    var red = 0;
    var green = 0;
    var blue = 0;
    if(bone.type === 0){
        w = 30;
        if(currentNumHands == 1){                                 //if only 1 hand shows up, make the lines green
            red = 166 - multiplierRed;
            green = 166 * multiplierGreen;
        }else if(currentNumHands == 2){
            red = 166 - multiplierRed;
            green = 166 * multiplierGreen;// else 2 hands, make lines red
        }
        strokeWeight(w);
    }else if(bone.type === 1){
        w = 20;
        if(currentNumHands == 1){
            red = 144 - multiplierRed;
            green = 144 * multiplierGreen;
        }else if(currentNumHands == 2){
            red = 144 - multiplierRed;
            green = 144 * multiplierGreen;


        }
        strokeWeight(w);
    }else if(bone.type === 2){
        w = 10;
        if(currentNumHands == 1){
            red = 115 - multiplierRed;
            green = 115 * multiplierGreen;

        }else if(currentNumHands == 2){
            red = 115 - multiplierRed;
            green = 115 * multiplierGreen;
        }
        strokeWeight(w);
    }else if(bone.type === 3){   // distal part
        w = 1;
        if(currentNumHands == 1){
            red = 90 - multiplierRed;
            green = 90 * multiplierGreen;
        }else if(currentNumHands == 2){
            red = 90 - multiplierRed;
            green = 90 * multiplierGreen;
        }
        strokeWeight(w);
    }

    stroke(red, green, blue);
    line(canvasX1, canvasY1, canvasX2, canvasY2);
}

function GotResults(err, result){
    testingSampleIndex +=1;
    if (testingSampleIndex >= trainX.shape[3]){
        testingSampleIndex = 0;
    }
    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    // console.log(predictedClassLabels.get(testingSampleIndex));
    var c = predictedClassLabels.get(testingSampleIndex);
    var d = digitToShow;

    n++;
    m = ((n-1) * m + (c == d))/n;
    console.log(n + ", " + m + ", " + c);

    //if the percent correct is higher than 50%, add one to the user count
    //user count determines if the user is doing well consistently
    if(m >= 0.50) {
        userIsDoingBetterCount = userIsDoingBetterCount + 1;
    }
    // }else{ //else it subtracts 1, unsure if i should add this tho
    //     userIsDoingBetterCount = userIsDoingBetterCount - 1;
    // }
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
        // console.log("entered program state 0.")
    }
    else if(HandIsUncentered()){  //hand is present but not centered
        programState = 1;
        // console.log("entered program state 1.")
    }
    else{    //else its present and centered
        programState = 2;
        // console.log("entered program state 2.")
    }
}

function HandleState0(frame) {
    TrainKNNIfNotDoneYet();
    DrawImageToHelpUserPutTheirHandOverTheDevice();
    //HandleState1();
}

function TrainKNNIfNotDoneYet () {
    if (trainingCompleted === false){
        Train();
        trainingCompleted = true;
    }
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

    //console.log(currentMean);

    if (currentMean > 0.75){
        return true;
    }
    return false;
}

function HandIsTooFarUp(){
    var yValues = framesOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();

    //console.log(currentMean);

    if (currentMean > 0.75){
        return true;
    }
    return false;
}

function HandIsTooFarDown(){
    var yValues = framesOfData.slice([],[],[1,6,3]);
    var currentMean = yValues.mean();

    //console.log(currentMean);

    if (currentMean< 0.25){
        return true;
    }
    return false;
}

function HandIsTooClose(){
    var zValues = framesOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();

    //console.log(currentMean);

    if (currentMean < 0.25){
        return true;
    }
    return false;
}

function HandIsTooFarForward(){
    var zValues = framesOfData.slice([],[],[2,6,3]);
    var currentMean = zValues.mean();

    //console.log(currentMean);

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
    //creates hand sign to do in lower right
    DrawLowerRightPanel();                                      //TODO DRAWING
    //if its been 5 seconds, switch digits..
    DetermineWhetherToSwitchDigits();
}

function SignIn(){
    console.log("SignIn() has been called.");
    username = document.getElementById('username').value;
    console.log(username);

    var list = document.getElementById('users');

    var newUser = IsNewUser(username,list);
    //console.log(newUser);

    if (!newUser){
        var item = document.createElement('li');
        var item2 = document.createElement('li');
        console.log("appending list...");
        item.innerHTML = String(username);
        item2.innerHTML = 1;
        list.appendChild(item);
        list.appendChild(item2);
        userNumber++;

        item.id = String(username) + "_name";
        item2.id =String(username) + "_signins";
    }else{
        ID = String(username) + "_signins";
        listItem = document.getElementById( ID );
        listItem.innerHTML = parseInt(listItem.innerHTML) + 1
    }

    console.log(list.innerHTML);
    //console.log(list);
    return false;
}

function IsNewUser(username,list){
    var usernameFound = false;

    var users = list.children;
    //console.log(users.length);
    for (var i = 0; i < users.length; i++){
        console.log("enter for loop");
        //console.log(users[i]);
        //console.log(users[i].innerHTML);
        if (username === users[i].innerHTML){
            console.log("found dupe username");
            usernameFound = true;
        }
    }

    return usernameFound;
    //console.log(users);
}

function DrawLowerRightPanel() {
    if (digitToShow == 0){
        image(sign0, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 1){
        image(sign1, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 2){
        image(sign2, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 3){
        image(sign3, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 4){
        image(sign4, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 5){
        image(sign5, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 6){
        image(sign6, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 7){
        image(sign7, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 8){
        image(sign8, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 9){
        image(sign9, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }
}

function DrawLowerRightPanelIfUserIsDoingWell() {
    if (digitToShow == 0){
        image(number0, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 1){
        image(number1, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 2){
        image(number2, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 3){
        image(number3, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 4){
        image(number4, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 5){
        image(number5, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 6){
        image(number6, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 7){
        image(number7, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 8){
        image(number8, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 9){
        image(number9, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }
}



function  DetermineWhetherToSwitchDigits() {
    if (TimeToSwitchDigits()){
        SwitchDigits();
    }
}

function TimeToSwitchDigits() {
    var currentTime = new Date();
    resultOfTimeInMilliseconds = currentTime - timeSinceLastDigitChange;
    resultOfTimeInSeconds = resultOfTimeInMilliseconds / 1000;

    if (resultOfTimeInSeconds > 5){
        return true;
    }
}

function SwitchDigits() {
    var randomElement;

    //if user is consistently getting a high enough percentage, take value from arrayOfSigns and append it to the
    //signsInUse array to use for the digits to show
    if( userIsDoingBetterCount > 50 ){

        //if there is still something in the arrayOfSigns, add the stuff
        if ( arrayOfSigns.length > 0){
            //find a random value from the array of signs
            randomElement = Math.floor(Math.random() * arrayOfSigns.length);
            //add that value to the signs in use array
            signsInUse.push(arrayOfSigns[randomElement]);
            //remove the added value from the array of signs so that you dont use it again
            arrayOfSigns.splice(randomElement, 1);
        }

        //reset countt for next time
        //userIsDoingBetterCount = 0;
    }

    lengthOfSignsInUse = signsInUse.length;

    //depending on the current length of signs in use, set the digit to the next one in the array
    setDigitToShowToNext(lengthOfSignsInUse, signsInUse);

    //create loop that adds digits to show based on what is in the signsInUse array
    // if (digitToShow == 0) {
    //     digitToShow = 4;
    // } else {
    //     digitToShow = 0;
    // }

    timeSinceLastDigitChange = new Date();
    n = 0;

    //reset count
    userIsDoingBetterCount = 0;
}

function setDigitToShowToNext(l, signsInUse) {
    //length is 2 at start, so only 0 and 1 is in array, so set digit to show to spot at 0

    if(l == 2){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];
        } else {
            digitToShow = signsInUse[0];
        }
     //if the length is 3, swap thru the values
    }else if(l == 3){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];
        } else if(digitToShow == signsInUse[1]){
            digitToShow = signsInUse[2];
        }else {
            digitToShow = signsInUse[0];
        }
    }
    //if length of array is 4, then loop thru all 4
    else if(l == 4){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            digitToShow = signsInUse[3];
        }
        else {
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 5){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            digitToShow = signsInUse[4];
        }
        else {
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 6){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            digitToShow = signsInUse[5];
        }
        else {
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 7){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            digitToShow = signsInUse[5];
        }
        else if(digitToShow == signsInUse[5]){
            digitToShow = signsInUse[6];
        }
        else {
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 8){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            digitToShow = signsInUse[5];
        }
        else if(digitToShow == signsInUse[5]){
            digitToShow = signsInUse[6];
        }
        else if(digitToShow == signsInUse[6]){
            digitToShow = signsInUse[7];
        }
        else {
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 8){
        if (digitToShow == signsInUse[0]) {
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            digitToShow = signsInUse[5];
        }
        else if(digitToShow == signsInUse[5]){
            digitToShow = signsInUse[6];
        }
        else if(digitToShow == signsInUse[6]){
            digitToShow = signsInUse[7];
        }
        else if(digitToShow == signsInUse[8]){
            digitToShow = signsInUse[9];
        }
        else {
            digitToShow = signsInUse[0];
        }
    }

    //
    // if (digitToShow == 0) {
    //     digitToShow = 1;
    // } else if (digitToShow == 1) {
    //     digitToShow = 2;
    // }else if (digitToShow == 2) {
    //     digitToShow = 3;
    // }else if (digitToShow == 3) {
    //     digitToShow = 4;
    // }else if (digitToShow == 4) {
    //     digitToShow = 5;
    // }else if (digitToShow == 5) {
    //     digitToShow = 6;
    // }else if (digitToShow == 6) {
    //     digitToShow = 7;
    // }else if (digitToShow == 7) {
    //     digitToShow = 8;
    // }else if (digitToShow == 8) {
    //     digitToShow = 9;
    // }else if (digitToShow == 9) {
    //     digitToShow = 0;
    // }

}