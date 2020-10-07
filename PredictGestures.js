const knnClassifier = ml5.KNNClassifier();

var numSamples = 0;
var trainingCompleted = false;
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros([150]);

// var predictedClassLabels = nj.zeros([numSamples]);

function draw(){
    // console.log(irisData.toString())
    // console.log(numSamples);
    clear();

    if (trainingCompleted === false){
        Train();
        trainingCompleted = true;
    }

    Test();

}

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


    var currentTestingSample = test.pick(null,null,null,testingSampleIndex).reshape(1, 120);
    // var i;
    // for(i = 0; i < test.shape[3]; i++){
    //     //console.log( train0.pick(null,null,null,i).toString() );
    //     var features = test.pick(null,null,null,i);
    //     features = features.reshape(testingSampleIndex, 120).reshape(1,120);
    //     //console.log(features.toString());
    //
    // }

    // var features = test.pick(testingSampleIndex).slice([0,4]);
    //var currentLabel = irisData.pick(testingSampleIndex).get([4]);

    var predictedLabel = knnClassifier.classify(currentTestingSample.tolist(), GotResults);

    // console.log(predictedClassLabels.toString())
    //console.log(currentTestingSample + "---" + predictedClassLabels.get(testingSampleIndex));
    // console.log(predictedLabel)
    console.log(testingSampleIndex + "---" + predictedClassLabels.get(testingSampleIndex));

}

function GotResults(err, result){

    testingSampleIndex +=1;


    if (testingSampleIndex > test.shape[3]-1){
        testingSampleIndex = 0;
    }

    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    // console.log(parseInt(result.label));
}
