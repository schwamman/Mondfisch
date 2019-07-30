'use strict';

var sketchpad = document.getElementById('sketchpad');

// if (sketchpad.getContext) {
//   var context = sketchpad.getContext('2d');
// }
// sketchpad.addEventListener('mousedown', mouseDown, false);
// sketchpad.addEventListener('mousemove', mouseMoves, false);
// window.addEventListener('mouseup', mouseUp, false);

function draw(context, x, y, size) {
  var r = 0;
  var g = 0;
  var b = 0;
  var a = 255;

  context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a / 255 + ')';
  context.beginPath();
  context.beginPath();
  context.arc(x, y, size, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
}

var mouseX = 0;
var mouseY = 0;
var mouseClicked = 0;

function mouseDown() {
  mouseClicked = 1;
  draw(context, mouseX, mouseY, 5);
}

function mouseUp() {
  mouseClicked = 0;
}

function mouseMoves(e) {
  getMousePosition(e);
  if (mouseClicked == 1) {
    draw(context, mouseX, mouseY, 5);
  }
}

function getMousePosition(e) {
  if (!e) {
    var e = event;
  }
  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  } else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
}

function clearsketchpad(sketchpad, context) {
  context.clearRect(0, 0, sketchpad.width, sketchpad.height);
}

function savesketchpad() {
  localStorage.setItem('sketch1', sketchpad.toDataURL());
}

function loadsketchpad() {
  var dataURL = localStorage.getItem('sketch1');
  var img = new Image();
  img.src = dataURL;
  context.drawImage(img, 0, 0);
}









//For localStorage testing purposes, can call function to display storage amounts ======================
var localStorageSpace = function() {
  var data = '';

  console.log('Current local storage: ');

  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      data += window.localStorage[key];
      console.log(
        key +
          ' = ' +
          ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2) +
          ' KB'
      );
    }
  }

  console.log(
    data
      ? '\n' +
          'Total space used: ' +
          ((data.length * 16) / (8 * 1024)).toFixed(2) +
          ' KB'
      : 'Empty (0 KB)'
  );
  console.log(
    data
      ? 'Approx. space remaining: ' +
          (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) +
          ' KB'
      : '5 MB'
  );
};