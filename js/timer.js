'use strict';

function timer() {
  var timerLocation = document.getElementById('timerDiv');
  timerLocation.innerHTML = ''
  var countdown = document.createElement("span");
  countdown.id = 'timer';
  countdown.textContent = '90';
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
  var timer = window.setInterval(countItDown, 1000);
};
