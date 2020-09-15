    var controllerOptions = {};
    var rawXMin = 1500;
    var rawXMax = 0;
    var rawYMin = 1500;
    var rawYMax = 0;

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

    // function HandleHand(hand){
    //     var finger = hand.fingers;
    //     finger.forEach(function(finger){
    //         HandleFinger(finger)
    //     });
    // }

    // function HandleFinger(finger) {
    //     var bone = finger.bones;
    //     var w = 1;
    //     bone.forEach(function(bone) {
    //         HandleBone(bone, w);
    //     });
    // }

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
            stroke('rgb(220,220,220)');
            strokeWeight(w);
        }else if(bone.type === 1){
            w = 20;
            stroke('rgb(192,192,192)');
            strokeWeight(w);
        }else if(bone.type === 2){
            w = 10;
            stroke('rgb(105,105,105)');
            strokeWeight(w);
        }else if(bone.type === 3){
            w = 1;
            stroke('rgb(0,0,0)');
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