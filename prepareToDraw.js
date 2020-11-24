var img;
var leftHandImg;
var rightHandImg;
var downHandImg;
var upleftHandImg;
var towardleftHandImg;
var awayleftHandImg;

function setup() { createCanvas(window.innerWidth,window.innerHeight);
    img = loadImage('https://i.imgur.com/ZWpvIrX.png');

    awayleftHandImg = loadImage('https://i.imgur.com/KH7Us5A.jpg');
    towardleftHandImg = loadImage('https://i.imgur.com/Q053VfE.jpg');

    leftHandImg = loadImage('https://i.imgur.com/tXgTzRY.jpg');
    rightHandImg = loadImage('https://i.imgur.com/vvGrJkc.jpg');

    downHandImg = loadImage('https://i.imgur.com/LaAIIrB.jpg');
    upleftHandImg = loadImage('https://i.imgur.com/iOCuMjC.jpg');

    signLanguage1 = loadImage('https://i.imgur.com/2qRoLHv.png');
    signLanguage2 = loadImage('https://i.imgur.com/8UkXfG1.png');

    // sign language images, number with handsign
    sign0 =loadImage('https://i.imgur.com/15PaBrl.png');
    sign1 =loadImage('https://i.imgur.com/Pa6ELZf.png');
    sign2 =loadImage('https://i.imgur.com/ZuxVpuU.png');
    sign3 =loadImage('https://i.imgur.com/6iNUcOh.png');
    sign4 =loadImage('https://i.imgur.com/EjBVNIj.png');
    sign5 =loadImage('https://i.imgur.com/PnOiIGi.png');
    sign6 =loadImage('https://i.imgur.com/4RzSGvK.png');
    sign7 =loadImage('https://i.imgur.com/F83Kl2B.png');
    sign8 =loadImage('https://i.imgur.com/FuB5hXq.png');
    sign9 =loadImage('https://i.imgur.com/cNAU6Gq.png');

    //regular number values
    number0 =loadImage('https://i.imgur.com/vzpl2EK.png');
    number1 =loadImage('https://i.imgur.com/tGYTaTT.png');
    number2 =loadImage('https://i.imgur.com/qCUhTkw.png');
    number3 =loadImage('https://i.imgur.com/RUdOJbc.png');
    number4 =loadImage('https://i.imgur.com/ggLaLlr.png');
    number5 =loadImage('https://i.imgur.com/TCT6ZCQ.png');
    number6 =loadImage('https://i.imgur.com/Daebc2D.png');
    number7 =loadImage('https://i.imgur.com/VnTIwl4.png');
    number8 =loadImage('https://i.imgur.com/XRixaZh.png');
    number9 =loadImage('https://i.imgur.com/IxK5aWm.png');


    //equation images (answers are in the name thing)
    equation0 = loadImage('https://i.imgur.com/jB67X5M.png');
    equation1 = loadImage('https://i.imgur.com/xGbsERM.png');
    equation2 = loadImage('https://i.imgur.com/1Rw2LJH.png');
    equation3 = loadImage('https://i.imgur.com/d4LUeRb.png');
    equation4 = loadImage('https://i.imgur.com/N3NzFE5.png');
    equation5 = loadImage('https://i.imgur.com/AfM3N3e.png');
    equation6 = loadImage('https://i.imgur.com/ibwTwI3.png');
    equation7 = loadImage('https://i.imgur.com/D08NUO3.png');
    equation8 = loadImage('https://i.imgur.com/2X417l8.png');
    equation9 = loadImage('https://i.imgur.com/NRZiF2U.png');
}