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
var timeCount;

var betterCount0 = 0;
var betterCount1 = 0;
var betterCount2 = 0;
var betterCount3 = 0;
var betterCount4 = 0;
var betterCount5 = 0;
var betterCount6 = 0;
var betterCount7 = 0;
var betterCount8 = 0;
var betterCount9 = 0;

//interim videos
var equationToShow = 1;

//interim vid 2 vars
var numUsers = 0;
var currentUser = "";
var usersAndData = [];
var arrayOfUsersData = [];

var mean0 = 0;
var mean1 = 0;
var mean2 = 0;
var mean3 = 0;
var mean4 = 0;
var mean5 = 0;
var mean6 = 0;
var mean7 = 0;
var mean8 = 0;
var mean9 = 0;

var meanOfEverything = 0;

var currentM = 0;

//--------interim vid 3
var sortedMeanAt0 = 0;
var sortedMeanAt1 = 0;
var sortedMeanAt2 = 0;
var sortedMeanAt3 = 0;
var sortedMeanAt4 = 0;
var sortedMeanAt5 = 0;
var sortedMeanAt6 = 0;
var sortedMeanAt7 = 0;
var sortedMeanAt8 = 0;
var sortedMeanAt9 = 0;

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
            green = 166 * multiplierGreen;                        // else 2 hands, make lines red
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
        userIsDoingBetterCount = userIsDoingBetterCount + 10;
        timeCount = timeCount + 1;
    }else{
        //timeCount = timeCount - 1;
    }

    //set the currentM, now should switch to the last m when you swap images
    currentM = m;


    console.log("each mean: " + mean0 + " " + mean1 + " " + mean2 + " " + mean3 + " " + mean4 + " " + mean5 + " "
        + mean6 + " "+ mean7 + " "+ mean8 + " " + mean9 + " ");

    //adds a betterCount to each number if the user is doing well on those numbers
    // if(m >= 0.50 && c == 0 ){
    //     betterCount0 = betterCount0 + 1;
    // }
    // if(m >= 0.40 && c == 1 ){
    //     betterCount1 = betterCount1 + 1;
    // }
    // if(m >= 0.40 && c == 2 ){
    //     betterCount2 = betterCount2 + 1;
    // }
    // if(m >= 0.40 && c == 3 ){
    //     betterCount3 = betterCount3 + 1;
    // }
    // if(m >= 0.50 && c == 4 ){
    //     betterCount4 = betterCount4 + 1;
    // }
    // if(m >= 0.50 && c == 5 ){
    //     betterCount5 = betterCount5 + 1;
    // }
    // if(m >= 0.50 && c == 6 ){
    //     betterCount6 = betterCount6 + 1;
    // }
    // if(m >= 0.50 && c == 7 ){
    //     betterCount7 = betterCount7 + 1;
    // }
    // if(m >= 0.50 && c == 8 ){
    //     betterCount8 = betterCount8 + 1;
    // }
    // if(m >= 0.50 && c == 9 ){
    //     betterCount9 = betterCount9 + 1;
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
}

function HandIsUncentered(){
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
        //should still have previous count here
        //if the user is not doing better, so count is <75, just use normal sign drawing
        //else, use just the number drawings
        DrawLowerRightPanel();
        DrawLowerLeftPanel();

        //if its been 5 seconds, switch digits..
        DetermineWhetherToSwitchDigits();
}

function SignIn(){
    console.log("SignIn() has been called.");

    // if (lengthOfSignsInUse === 4){
    //     outputHTMLTextBasedOnUserData();
    // }
    outputHTMLTextBasedOnUserData();
    // reset all the global vars fo rthe thing
    aNewUserHasAppeared();

    username = document.getElementById('username').value;
    console.log(username);

    var list = document.getElementById('users');

    var newUser = IsNewUser(username,list);
    //console.log(newUser);

    if (!newUser){
        var item = document.createElement('li');
        var item2 = document.createElement('li');
        console.log("appending new user to html list...");
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

    currentUser = username;
    usersAndData.push(currentUser);

    console.log("current user = " + currentUser);
    console.log(usersAndData);

    return usernameFound;
    //console.log(users);
}

function DrawLowerRightPanel() {
    // var better = false;
    // if (userIsDoingBetterCount > 75){
    //     better = true;
    // }
    // if (lengthOfSignsInUse >= 10){
    //     DrawDigitToShow();
    // }else{
    //     DrawEquations();
    // }

    if (lengthOfSignsInUse < 10){
        DrawDigitToShow();
        console.log("current length of digits to show: " + lengthOfSignsInUse)
        console.log("each mean(drawlowerrpanel f): " + mean0 + " " + mean1 + " " + mean2 + " " + mean3 + " " + mean4 + " " + mean5 + " "
            + mean6 + " "+ mean7 + " "+ mean8 + " " + mean9 + " ");
    }else{
        console.log("----------------------------------------------tryna draw equations...");
        DrawEquations();
        console.log("drew ewuations poggers")
    }
}

function DrawLowerLeftPanel() {
    //create growing rectangle based on best average means
    console.log("Draw Lower Left Panel Has been called");

    //calculate all the means
    meanOfEverything = (mean0 + mean1 + mean2 + mean3 + mean4 + mean5 + mean6 + mean7 + mean8 + mean9) / 10;

    console.log("mean of everything: " + meanOfEverything);


    stroke("blue");
    rect(0, window.innerHeight, meanOfEverything * 1000, 100)

}


function DrawDigitToShow() {
    //draws the asl sign of the numbers, if you are doing well, then switch to just the number.
    if (digitToShow == 0){
        if (betterCount0 > 75){
            image(number0, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign0, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
    }else if(digitToShow === 1){
        if (betterCount1 > 75){
            image(number1, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign1, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
    }else if(digitToShow == 2){
        if (betterCount2 > 75){
            image(number2, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign2, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
    }else if(digitToShow == 3){
        if (betterCount3 > 75){
            image(number3, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign3, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
    }else if(digitToShow == 4){
        if (betterCount4 > 75){
            image(number4, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign4, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
    }else if(digitToShow == 5){
        if (betterCount5 > 75){
            image(number5, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign5, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
        //image(sign5, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 6){
        if (betterCount6 > 75){
            image(number6, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign6, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
        //image(sign6, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 7){
        if (betterCount7 > 75){
            image(number7, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign7, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
        //image(sign7, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 8){
        if (betterCount8 > 75){
            image(number8, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign8, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
        //image(sign8, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 9){
        if (betterCount9 > 75){
            image(number9, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }else{
            image(sign9, window.innerWidth/2, window.innerHeight/2, 0, 0)
        }
        //image(sign9, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }
}

function DrawEquations() {
    //draws the equations
    if (digitToShow == 0){
        image(equation0, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 1){
        image(equation1, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 2){
        image(equation2, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 3){
        image(equation3, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 4){
        image(equation4, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 5){
        image(equation5, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 6){
        image(equation6, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 7){
        image(equation7, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 8){
        image(equation8, window.innerWidth/2, window.innerHeight/2, 0, 0)
    }else if(digitToShow == 9){
        image(equation9, window.innerWidth/2, window.innerHeight/2, 0, 0)
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

    var timeForUser = 2;

    // if (timeCount > 75){
    //     timeForUser = 2;
    // }else{
    //     timeForUser = 5;
    // }

    if (resultOfTimeInSeconds > timeForUser){
        return true;
    }
}

function SwitchDigits() {
    var randomElement;

    //if user is consistently getting a high enough percentage, take value from arrayOfSigns and append it to the
    //signsInUse array to use for the digits to show
    if( userIsDoingBetterCount > 50 ){

        //if there is still something in the arrayOfSigns, add the stuff
        if ( signsInUse.length < 10){
            //find a random value from the array of signs
            randomElement = Math.floor(Math.random() * arrayOfSigns.length);
            //add that value to the signs in use array
            signsInUse.push(arrayOfSigns[randomElement]);
            //remove the added value from the array of signs so that you dont use it again
            arrayOfSigns.splice(randomElement, 1);

            console.log("successfully added value to array")
        }
    }

    lengthOfSignsInUse = signsInUse.length;

    //depending on the current length of signs in use, set the digit to the next one in the array
    setDigitToShowToNext(lengthOfSignsInUse, signsInUse);

    timeSinceLastDigitChange = new Date();
    n = 0;

    //reset count
    userIsDoingBetterCount = 0;
}

function setDigitToShowToNext(l, signsInUse) {
    //length is 2 at start, so only 0 and 1 is in array, so set digit to show to spot at 0
    if(l == 2){
        if (digitToShow == signsInUse[0]) {

            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }

            digitToShow = signsInUse[1];
        } else {
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[0];
        }
     //if the length is 3, swap thru the values
    }else if(l == 3){
        if (digitToShow == signsInUse[0]) {
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];
        } else if(digitToShow == signsInUse[1]){
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];
        }else {
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[0];
        }
    }
    //if length of array is 4, then loop thru all 4
    else if(l == 4){
        if (digitToShow == signsInUse[0]) {
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[3];
        }
        else {
            // get best value of mean
            if (currentM > mean3){
                mean3 = currentM
            }
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 5){
        if (digitToShow == signsInUse[0]) {
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            // get best value of mean
            if (currentM > mean3){
                mean3 = currentM
            }
            digitToShow = signsInUse[4];
        }
        else {
            // get best value of mean
            if (currentM > mean4){
                mean4 = currentM
            }
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 6){
        if (digitToShow == signsInUse[0]) {
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            // get best value of mean
            if (currentM > mean3){
                mean3 = currentM
            }
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            // get best value of mean
            if (currentM > mean4){
                mean4 = currentM
            }
            digitToShow = signsInUse[5];
        }
        else {
            // get best value of mean
            if (currentM > mean5){
                mean5 = currentM
            }
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 7){
        if (digitToShow == signsInUse[0]) {
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            // get best value of mean
            if (currentM > mean3){
                mean3 = currentM
            }
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            // get best value of mean
            if (currentM > mean4){
                mean4 = currentM
            }
            digitToShow = signsInUse[5];
        }
        else if(digitToShow == signsInUse[5]){
            // get best value of mean
            if (currentM > mean5){
                mean5 = currentM
            }
            digitToShow = signsInUse[6];
        }
        else {
            // get best value of mean
            if (currentM > mean6){
                mean6 = currentM
            }
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 8){
        if (digitToShow == signsInUse[0]) {
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];

        } else if(digitToShow == signsInUse[1]){
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            // get best value of mean
            if (currentM > mean3){
                mean3 = currentM
            }
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            // get best value of mean
            if (currentM > mean4){
                mean4 = currentM
            }
            digitToShow = signsInUse[5];
        }
        else if(digitToShow == signsInUse[5]){
            // get best value of mean
            if (currentM > mean5){
                mean5 = currentM
            }
            digitToShow = signsInUse[6];
        }
        else if(digitToShow == signsInUse[6]){
            // get best value of mean
            if (currentM > mean6){
                mean6 = currentM
            }
            digitToShow = signsInUse[7];
        }
        else {
            // get best value of mean
            if (currentM > mean7){
                mean7 = currentM
            }
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 9){
        if (digitToShow == signsInUse[0]) {
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];
        } else if(digitToShow == signsInUse[1]){
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];

        }else if(digitToShow == signsInUse[2]){
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[3];
        }
        else if(digitToShow == signsInUse[3]){
            // get best value of mean
            if (currentM > mean3){
                mean3 = currentM
            }
            digitToShow = signsInUse[4];
        }
        else if(digitToShow == signsInUse[4]){
            // get best value of mean
            if (currentM > mean4){
                mean4 = currentM
            }
            digitToShow = signsInUse[5];
        }
        else if(digitToShow == signsInUse[5]){
            // get best value of mean
            if (currentM > mean5){
                mean5 = currentM
            }
            digitToShow = signsInUse[6];
        }
        else if(digitToShow == signsInUse[6]){
            // get best value of mean
            if (currentM > mean6){
                mean6 = currentM
            }
            digitToShow = signsInUse[7];
        }
        else if(digitToShow == signsInUse[7]) {
            // get best value of mean
            if (currentM > mean7){
                mean7 = currentM
            }
            digitToShow = signsInUse[8];
        }
        else {
            // get best value of mean
            if (currentM > mean8){
                mean8 = currentM
            }
            digitToShow = signsInUse[0];
        }
    }
    else if(l == 10) {
        if (digitToShow == signsInUse[0]) {
            // set mean of 0 to the last m value
            // get best value of mean
            if (currentM > mean0){
                mean0 = currentM
            }
            digitToShow = signsInUse[1];
        } else if (digitToShow == signsInUse[1]) {
            // get best value of mean
            if (currentM > mean1){
                mean1 = currentM
            }
            digitToShow = signsInUse[2];
        } else if (digitToShow == signsInUse[2]) {
            // get best value of mean
            if (currentM > mean2){
                mean2 = currentM
            }
            digitToShow = signsInUse[3];
        } else if (digitToShow == signsInUse[3]) {
            // get best value of mean
            if (currentM > mean3){
                mean3 = currentM
            }
            digitToShow = signsInUse[4];
        } else if (digitToShow == signsInUse[4]) {
            // get best value of mean
            if (currentM > mean4){
                mean4 = currentM
            }
            digitToShow = signsInUse[5];
        } else if (digitToShow == signsInUse[5]) {
            // get best value of mean
            if (currentM > mean5){
                mean5 = currentM
            }
            digitToShow = signsInUse[6];
        } else if (digitToShow == signsInUse[6]) {
            // get best value of mean
            if (currentM > mean6){
                mean6 = currentM
            }
            digitToShow = signsInUse[7];
        } else if (digitToShow == signsInUse[7]) {
            // get best value of mean
            if (currentM > mean7){
                mean7 = currentM
            }
            digitToShow = signsInUse[8];
        }  else if (digitToShow == signsInUse[8]) {
            // get best value of mean
            if (currentM > mean8){
                mean8 = currentM
            }
            digitToShow = signsInUse[9];
        } else {
            // set mean9 to currentM, now should have all the data in the thing
            // get best value of mean
            if (currentM > mean9){
                mean9 = currentM
            }

            console.log("each mean: " + mean0 + " " + mean1 + " " + mean2 + " " + mean3 + " " + mean4 + " " + mean5 + " "
                + mean6 + " "+ mean7 + " "+ mean8 + " " + mean9 + " ");


            //repeat the signs.
            digitToShow = signsInUse[0];

        }
    }
}

function aNewUserHasAppeared() {
    //reset global variables if a new user signs in
    console.log(usersAndData);

    console.log(signsInUse);

    arrayOfSigns = [2,3,4,5,6,7,8,9];
    signsInUse = [0,1];
    userIsDoingBetterCount = 0;
    lengthOfSignsInUse = 0;

    console.log(signsInUse);

    mean0 = 0;
    mean1 = 0;
    mean2 = 0;
    mean3 = 0;
    mean4 = 0;
    mean5 = 0;
    mean6 = 0;
    mean7 = 0;
    mean8 = 0;
    mean9 = 0;

    meanOfEverything = 0;

    currentM = 0;
}

function outputHTMLTextBasedOnUserData() {

    var aslSignAt0 = signsInUse[0];   //will give the current integer at in this point, first 2 will br 0 and 1
    var aslSignAt1 = signsInUse[1];
    var aslSignAt2 = signsInUse[2];
    var aslSignAt3 = signsInUse[3];
    var aslSignAt4 = signsInUse[4];
    var aslSignAt5 = signsInUse[5];
    var aslSignAt6 = signsInUse[6];
    var aslSignAt7 = signsInUse[7];
    var aslSignAt8 = signsInUse[8];
    var aslSignAt9 = signsInUse[9];

    // matches each sign with its mean
    var dataObjects = [
        {aslSign: aslSignAt0, mean: mean0},
        {aslSign: aslSignAt1, mean: mean1},
        {aslSign: aslSignAt2, mean: mean2},
        {aslSign: aslSignAt3, mean: mean3},
        {aslSign: aslSignAt4, mean: mean4},
        {aslSign: aslSignAt5, mean: mean5},
        {aslSign: aslSignAt6, mean: mean6},
        {aslSign: aslSignAt7, mean: mean7},
        {aslSign: aslSignAt8, mean: mean8},
        {aslSign: aslSignAt9, mean: mean9}
    ];

    //sorts the objects so they go 0,1,2,3,4 etc instead of random (ei 0,1,6,3,2,8..)
    var sortedData = dataObjects.sort(customCompare);

    //how to get object data at each data point
    console.log("aslSign[0]: " + sortedData[0].aslSign + " mean: " + sortedData[0].mean);

    console.log("sorted data: ");
    console.log(sortedData);

    sortedMeanAt0 = sortedData[0].mean;
    sortedMeanAt1 = sortedData[1].mean;
    sortedMeanAt2 = sortedData[2].mean;
    sortedMeanAt3 = sortedData[3].mean;
    sortedMeanAt4 = sortedData[4].mean;
    sortedMeanAt5 = sortedData[5].mean;
    sortedMeanAt6 = sortedData[6].mean;
    sortedMeanAt7 = sortedData[7].mean;
    sortedMeanAt8 = sortedData[8].mean;
    sortedMeanAt9 = sortedData[9].mean;

    // console.log("Individual Sorted Data---------");
    // console.log(sortedMeanAt0 + " " + sortedMeanAt1 + " " + sortedMeanAt2 + " "+
    //     sortedMeanAt3 + " " + sortedMeanAt4  + " " +  sortedMeanAt5  + " " +  sortedMeanAt6 + " " +
    //     sortedMeanAt7 + " " +  sortedMeanAt8 + " " + sortedMeanAt9);

    //setup cookies
    WriteScoreToFile();
}

function WriteScoreToFile() {

    //Make a cookie
    document.cookie = "username" + "=" + escape(currentUser) + "; path=/";
    document.cookie = "Mean0" + "=" + escape(sortedMeanAt0) + "; path=/";
    document.cookie = "Mean1" + "=" + escape(sortedMeanAt1) + "; path=/";
    document.cookie = "Mean2" + "=" + escape(sortedMeanAt2) + "; path=/";
    document.cookie = "Mean3" + "=" + escape(sortedMeanAt3) + "; path=/";
    document.cookie = "Mean4" + "=" + escape(sortedMeanAt4) + "; path=/";
    document.cookie = "Mean5" + "=" + escape(sortedMeanAt5) + "; path=/";
    document.cookie = "Mean6" + "=" + escape(sortedMeanAt6) + "; path=/";
    document.cookie = "Mean7" + "=" + escape(sortedMeanAt7) + "; path=/";
    document.cookie = "Mean8" + "=" + escape(sortedMeanAt8) + "; path=/";
    document.cookie = "Mean9" + "=" + escape(sortedMeanAt9) + "; path=/";

    // document.cookie = "username" + "=" + escape(currentUser) + "; Mean0" + "=" + escape(sortedMeanAt0) +
    //     "; Mean1" + "=" + escape(sortedMeanAt1) + "; Mean2" + "=" + escape(sortedMeanAt2) +  "; Mean3" +
    //     "=" + escape(sortedMeanAt3) + "; Mean4" + "=" + escape(sortedMeanAt4) + "; Mean5" + "="
    //     + escape(sortedMeanAt5) + "; Mean6" + "=" + escape(sortedMeanAt6) + "; Mean7" + "=" +
    //     escape(sortedMeanAt7) + "; Mean8" + "=" + escape(sortedMeanAt8) + "; Mean9" + "="
    //     + escape(sortedMeanAt9) + "; path=/";



        //console.log("Cookie:", document.cookie);
}

// compares each aslSign, orders dataObjects so it goes 0,1,2,3,4, instead of random
function  customCompare(a, b) {
    if (a.aslSign > b.aslSign) return 1;
    if (b.aslSign > a.aslSign) return -1;
    return 0;
}

//function to return all the cookies, prob derivative but not gonna fix cause dont have time lol
function showCookies() {
    return document.cookie
}