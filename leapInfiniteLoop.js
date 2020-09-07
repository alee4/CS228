
    var controllerOptions = {};
    //var i = 0;
    //var x = (window.innerWidth)/2;
    //var y = (window.innerHeight)/2;
    var x = 0;
    var y = 0
    var z = 0;
    var ranNumX;
    var ranNumY;
    var hand;
    var fingers;


    function HandleFinger(finger) {
        if (finger.type == 1){
            console.log("Index finger info: " + finger);

            console.log(finger.tipPosition[0]);

            x = finger.tipPosition[0];
            y = finger.tipPosition[1];
            z = finger.tipPosition[2];

            circle(x, y, 100);

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



