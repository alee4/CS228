    var controllerOptions = {};
    var x = 0;
    var y = 0;
    var z = 0;
    var rawXMin = 1500;
    var rawXMax = 0;
    var rawYMin = 1500;
    var rawYMax = 0;
    var outputX = 0;
    var outputY = 0;

    Leap.loop(controllerOptions, function(frame) {
            clear();
            HandleFrame(frame);
        }
    );

    function HandleFrame(frame) {
        if (frame.hands.length === 1){
            var hand = frame.hands[0];
            HandleHand(hand)
        }
    }

    function HandleHand(hand){
        var finger = hand.fingers;
        finger.forEach(function(finger){
            HandleFinger(finger)
        });
    }

    function HandleFinger(finger) {
        var bone = finger.bones;
        bone.forEach(function(bone) {
            //if (finger.type == 1){
            //console.log(bone);
            HandleBone(bone);

            // x = finger.tipPosition[0];
            // y = window.innerHeight - finger.tipPosition[1]; //finger.tipPosition[1];
            // z = finger.tipPosition[2];
            //
            // if (x < rawXMin) {
            //     rawXMin = x;
            // }
            // if (x > rawXMax) {
            //     rawXMax = x;
            // }
            // if (y < rawYMin) {
            //     rawYMin = y;
            // }
            // if (y > rawYMax) {
            //     rawYMax = y;
            // }
            //
            // outputX = ((x - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth - 0);
            // outputY = ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerHeight - 0);
            //
            // circle(outputX, outputY, 100);
            //}
        });
    }

    function HandleBone(bone){
        x = bone.nextJoint[0];
        y = window.innerHeight - bone.nextJoint[1];
        z = bone.nextJoint[2];

        //console.log(x,y,z)

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

        outputX = ((x - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth - 0);
        outputY = ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerHeight - 0);

        circle(outputX, outputY, 100);

    }