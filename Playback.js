
oneFrameOfData = nj.array([[[1068.36079,158.56662,108.981,1068.36079,158.56662,108.981],
    [1068.36079,158.56662,108.981,831.22541,146.72524,81.052],
    [831.22541,146.72524,81.052,699.93128,146.36347,55.8932],
    [699.93128,146.36347,55.8932,588.15483,140.63658,42.9551]],
    [[1107.68637,88.30647,103.418,864.97534,27.63958,46.6913],
        [864.97534,27.63958,46.6913,752.39639,54.32306,9.73171],
        [752.39639,54.32306,9.73171,690.8332,77.29198,-10.5132],
        [690.8332,77.29198,-10.5132,648.45036,97.25372,-24.4674]],
    [[1164.19234,80.8838,96.3699,981.05275,22.87848,37.5789],
        [981.05275,22.87848,37.5789,876.73925,51.54521,-5.7183],
        [876.73925,51.54521,-5.7183,813.2393,78.96515,-30.2271],
        [813.2393,78.96515,-30.2271,770.74528,101.74026,-45.8085]],
    [[1223.60579,83.59705,89.756,1109.04268,32.80444,33.1407],
        [1109.04268,32.80444,33.1407,1000.10964,47.46242,-6.66351],
        [1000.10964,47.46242,-6.66351,929.17569,66.90089,-30.4761],
        [929.17569,66.90089,-30.4761,880.15579,84.80186,-45.9798]],
    [[ 1280,109.36965,83.8215,1222.92119,57.35608,29.7271],
        [1222.92119,57.35608,29.7271,1157.94907,74.71763,-2.98497],
        [1157.94907,74.71763,-2.98497,1114.75817,93.54885,-19.8817],
        [1114.75817,93.54885,-19.8817,1072.95284,115.46477,-33.7877]]])

anotherFrameOfData = nj.array([[[  847.48414,  232.27372,    101.628,  847.48414,  232.27372,    101.628],
    [  847.48414,  232.27372,    101.628,  416.88115,  208.17794,    80.1618],
    [  416.88115,  208.17794,    80.1618,  199.85765,  204.18862,    55.9746],
    [  199.85765,  204.18862,    55.9746,   35.43078,  199.26799,    40.7642]],
    [[  930.48079,  162.46407,    97.1099,  483.34203,   74.80325,    49.5185],
        [  483.34203,   74.80325,    49.5185,   245.0727,   88.68595,    16.7395],
        [   245.0727,   88.68595,    16.7395,  118.68439,  119.02286,    -0.1891],
        [  118.68439,  119.02286,    -0.1891,   37.56917,  150.23896,   -10.8193]],
    [[  1021.2873,  156.25074,    89.7169,  671.89668,   73.88237,    39.1348],
        [  671.89668,   73.88237,    39.1348,  431.59651,   88.04655,    0.69847],
        [  431.59651,   88.04655,    0.69847,  281.69371,  123.68286,   -19.1461],
        [  281.69371,  123.68286,   -19.1461,  184.71115,  158.32185,    -30.199]],
    [[ 1114.24581,  160.46594,    82.4862,  880.58758,   89.48868,    32.6258],
        [  880.58758,   89.48868,    32.6258,   651.5022,   94.71858,   -2.81519],
        [   651.5022,   94.71858,   -2.81519,  493.90643,  127.48453,   -21.6174],
        [  493.90643,  127.48453,   -21.6174,  388.27085,  161.86289,   -31.8462]],
    [[ 1198.68137,  187.93248,    75.4692, 1061.86373,  119.27654,    27.0339],
        [ 1061.86373,  119.27654,    27.0339,   903.0671,  131.79703,   -1.99832],
        [   903.0671,  131.79703,   -1.99832,  789.21677,  159.99681,   -14.2277],
        [  789.21677,  159.99681,   -14.2277,  683.29319,  195.05975,    -21.664]]])



var frameIndex = 0;
var flip = 0;

function draw(){
    clear();

    for (var fingerIndex = 0; fingerIndex < 5; fingerIndex++){
        for(var boneIndex = 0; boneIndex < 4; boneIndex++){

            if (flip == 0){
                xStart = oneFrameOfData.get(fingerIndex,boneIndex,0);
                yStart = oneFrameOfData.get(fingerIndex,boneIndex,1);
                zStart = oneFrameOfData.get(fingerIndex,boneIndex,2);
                xEnd = oneFrameOfData.get(fingerIndex,boneIndex,3);
                yEnd = oneFrameOfData.get(fingerIndex,boneIndex,4);
                zEnd = oneFrameOfData.get(fingerIndex,boneIndex,5);

                line(xStart, yStart, xEnd, yEnd);
            }else{
                xStart = anotherFrameOfData.get(fingerIndex,boneIndex,0);
                yStart = anotherFrameOfData.get(fingerIndex,boneIndex,1);
                zStart = anotherFrameOfData.get(fingerIndex,boneIndex,2);
                xEnd = anotherFrameOfData.get(fingerIndex,boneIndex,3);
                yEnd = anotherFrameOfData.get(fingerIndex,boneIndex,4);
                zEnd = anotherFrameOfData.get(fingerIndex,boneIndex,5);

                line(xStart, yStart, xEnd, yEnd);
            }

            frameIndex++;
            if (frameIndex === 100){
                frameIndex = 0;
                if (flip === 0){
                    flip = 1;
                }else{
                    flip = 0;
                }
            }
        }
    }

}



// var controllerOptions = {};
// var rawXMin = 1500;
// var rawXMax = 0;
// var rawYMin = 1500;
// var rawYMax = 0;
//
// Leap.loop(controllerOptions, function(frame) {
//         clear();
//         HandleFrame(frame);
//     }
// );
//
// function HandleFrame(frame) {
//     if (frame.hands.length === 1){
//         var hand = frame.hands[0];
//         HandleHand(hand)
//     }
// }
// function HandleHand(hand) {
//
//     var finger = hand.fingers;
//     var i;
//
//     for (i = 3; i >=0; i--){
//         var w = 1;
//         //var j = 0;
//         finger.forEach(function(finger){
//             var bone = finger.bones;
//             HandleBone(bone[i], w);
//         });
//     }
// }
//
// // function HandleHand(hand){
// //     var finger = hand.fingers;
// //     finger.forEach(function(finger){
// //         HandleFinger(finger)
// //     });
// // }
//
// // function HandleFinger(finger) {
// //     var bone = finger.bones;
// //     var w = 1;
// //     bone.forEach(function(bone) {
// //         HandleBone(bone, w);
// //     });
// // }
//
// function HandleBone(bone, w){
//     //coords for tips of each bone
//     xTip = bone.nextJoint[0];
//     yTip = window.innerHeight - bone.nextJoint[1];
//     zTip = bone.nextJoint[2];
//
//     [xTip,yTip] = TransformCoordinates(xTip,yTip)
//
//     //coords for base of each bone
//     xBase = bone.prevJoint[0];
//     yBase = window.innerHeight - bone.prevJoint[1];
//     zBase = bone.prevJoint[2];
//
//     [xBase,yBase] = TransformCoordinates(xBase,yBase)
//
//     if(bone.type === 0){
//         w = 30;
//         stroke('rgb(220,220,220)');
//         strokeWeight(w);
//     }else if(bone.type === 1){
//         w = 20;
//         stroke('rgb(192,192,192)');
//         strokeWeight(w);
//     }else if(bone.type === 2){
//         w = 10;
//         stroke('rgb(105,105,105)');
//         strokeWeight(w);
//     }else if(bone.type === 3){
//         w = 1;
//         stroke('rgb(0,0,0)');
//         strokeWeight(w);
//     }
//
//     line(xTip, yTip, xBase, yBase)
//     //circle(outputX, outputY, 100);
// }
//
// function TransformCoordinates(x,y){
//     if (x < rawXMin) {
//         rawXMin = x;
//     }
//     if (x > rawXMax) {
//         rawXMax = x;
//     }
//     if (y < rawYMin) {
//         rawYMin = y;
//     }
//     if (y > rawYMax) {
//         rawYMax = y;
//     }
//
//     x = ((x - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth);
//     y = ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerHeight);
//
//     return [x,y];
// }