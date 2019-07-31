'use strict';

function timer() {
  var timerLocation = document.getElementById('timerDiv');
  timerLocation.innerHTML = ''
  var countdown = document.createElement("span");
  countdown.id = 'timer';
  countdown.textContent = '60'
  timerLocation.appendChild(countdown);
  var countItDown = function() {
    var currentTime = parseFloat(countdown.textContent);
    if (currentTime > 0) {
      countdown.textContent = currentTime - 1;
      var bigFish = document.getElementById('bigFish')
      if(bigFish) document.getElementsByTagName('body')[0].removeChild(bigFish);
    } else {
      window.clearInterval(timer);
      init();
    }
  }
  var timer = window.setInterval(countItDown, 100);
};
//Call that on an interval

//==========================================================================================
//trigger mondfish to swim across at 0 seconds
var animate, left = 0, imgObj = null;
var width = 1;

function init(){

  imgObj = document.createElement('img')
  imgObj.id = 'bigFish'
  imgObj.setAttribute('src','../assets/img/mondFisch.jpg');
  imgObj.style.zIndex = '0';
  imgObj.style.width = '111vw';
  imgObj.style.position = 'absolute';
  imgObj.style.top = '-300px';
  imgObj.style.left = '-1600px';
  imgObj.style.visibility = 'hidden';
  var body = document.getElementsByTagName('body')[0]
  body.appendChild(imgObj);

  moveRight();
}

function moveRight(){
  left = parseInt(imgObj.style.left, 10);

  if (left < (window.innerWidth)) {
    imgObj.style.left = (left + 5) + 'px';
    imgObj.style.visibility = 'visible';

    animate = setTimeout(function(){moveRight();},20); 
    // call moveRight in 20msec

    //stopanimate = setTimeout(moveRight,20);
  } else {
    stop();
  }
  //f();
}

function stop(){
  clearTimeout(animate);
}