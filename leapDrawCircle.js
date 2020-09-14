
    var controllerOptions = {};
    //var i = 0;
    var xMid = (window.innerWidth)/2;
    var yMid = (window.innerHeight)/2;
    var x = 0;
    var y = 0
    var z = 0;
    var ranNumX;
    var ranNumY;
    var hand;
    var fingers;

    var rawXMin = -260;
    var rawXMax = 312;
    var rawYMin = 400;
    var rawYMax = -313;

    var xMax = window.innerWidth;
    var xMin = 0;
    var outputX = 0;
    var yMax = window.innerHeight;
    var yMin = 0
    var yPercent = 0;
    var xPercent = 0;
    var outputY = 0;

    function HandleFinger(finger) {
        if (finger.type == 1){
            console.log("Index finger info: " + finger);

            console.log(finger.tipPosition[0]);

            x = finger.tipPosition[0];
            y = finger.tipPosition[1]; //window.innerHeight-finger.tipPosition[1];
            z = finger.tipPosition[2];

            if (x < rawXMin){
                console.log("x is in rawXMax, where x = " + x);
            }
            if ( x > rawXMax){
                console.log("x is in rawXMin, where x = " + x);
            }
            if (y < rawYMin){
                console.log("x is in rawYMax, where y = " + y);
            }
            if ( y > rawYMax){
                console.log("x is in rawYMin, where y = " + y);
            }
            //
            // outputX = convertRange( x, [ rawXMin, rawXMax ], [ 0, xMax] );
            // outputY = convertRange( y, [ rawYMin, rawYMax ], [ 0, yMax] );
            // xPercent = (y - yMin) / (yMax - yMin);
            // outputX = xPercent * (xMax - xMin) + xMin;

            outputX =  ((x - rawXMin) / (rawXMax - rawXMin)) * (window.innerWidth - 0) +0
            outputY =  ((y - rawYMin) / (rawYMax - rawYMin)) * (window.innerHeight - 0) +0

            circle(outputX, outputY, 100);
            console.log(x);
        }
    }

    function HandleHand(hand){
        hand.fingers.forEach(function(finger){
            HandleFinger(finger)
        });
    }

    function HandleFrame(frame) {
        //var arr = new Array(frame.hands);
        // //console.log(frame);
        if (frame.hands.length === 1){
            //console.log(frame.hands[0]);
            hand = frame.hands[0];
            //console.log(hand);
            fingers = hand.fingers;
            //console.log(fingers);

            HandleHand(hand)
        }
    }

    Leap.loop(controllerOptions, function(frame) {
        clear();
        HandleFrame(frame);



        // ranNumX = Math.floor(Math.random() * 2) -1;
        // ranNumY = Math.floor(Math.random() * 2) -1;
        // //console.log(i)



        }
    );



