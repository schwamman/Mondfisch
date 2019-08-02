'use strict';
//do not move this; it took forever to get it to work again correctly. thank you!
var roundCount = 1;

//Save initial text form on homepage to local storage, then clear html elements from homepage and render sketchpad, can set to start on event button click
//add event listener outside the function to run from form submit button (id="start) on index.html which starts game
function startGame() {
  renderTextPhrase(roundCount);
  renderSketchpad();
  init();
  changeId('right-col', 'right-col-sketch');
  renderNextFormBtn();
  timer();
}

//Save sketchpad image to local storage - can store using canvas.toDataURL(), then clear sketchpad, render saved drawing as static image and render new text form
function generateTextFormPage() {
  saveDrawing();
  clearSketchpad();
  renderStaticImage(roundCount);
  renderTextForm();
  changeId('right-col-sketch', 'right-col');
  renderNextSketchButton();
  renderEndBtn();
  roundCount++;
  timer();
  
}

function generateSketchPadPage() {
  window.clearInterval(timer);
  saveForm();
  clearForm();
  renderTextPhrase(roundCount);
  renderSketchpad();
  init();
  changeId('right-col', 'right-col-sketch');
  renderNextFormBtn();
  timer();  
}

function endGame() {
  window.clearInterval(timer);
  saveForm();
  clearForm();
  renderResults();
  localStorage.clear();
  changeId('previousRoundSketch', 'endResults');

  var timerLocation = document.getElementById('timerDiv');
  timerLocation.removeChild(timerLocation.firstChild);
}

//rendering the canvas pad
function renderSketchpad() {
  changeId('currentText', 'currentRound')
  
  var canvas = document.createElement('canvas');
  var sketchpadLocation = document.getElementById('currentRound');
  canvas.setAttribute('id', 'sketchpad');
  canvas.setAttribute('width', '500px');
  canvas.setAttribute('height', '500px');
  sketchpadLocation.appendChild(canvas);

  var clearLocation = document.getElementById('buttonsRight');
  var sketchpad = document.getElementById('sketchpad');
  if (sketchpad.getContext) {
    var ctx = sketchpad.getContext('2d');
  }
  var clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';
  clearBtn.setAttribute('id', 'clearBtn');
  clearBtn.addEventListener('click', function() {clearCanvas(sketchpad,ctx);});
  clearLocation.appendChild(clearBtn);
}

function saveForm() {
  var userInput = document.getElementById('phraseInput').value;
  localStorage.setItem('formPhrase' + roundCount, userInput);
}

function saveDrawing() {
  var userSketch = document.getElementById('sketchpad');
  localStorage.setItem('sketch' + roundCount, userSketch.toDataURL());
}

function clearSketchpad() {

  var previousForm = document.getElementById('previousRound');
  while (previousForm.hasChildNodes()) {
    previousForm.removeChild(previousForm.firstChild);
  }

  var sketchpad = document.getElementById('sketchpad');
  sketchpad.parentNode.removeChild(sketchpad);
  var nextBtn = document.getElementById('nextBtn');
  nextBtn.parentNode.removeChild(nextBtn);
  var clearBtn = document.getElementById('clearBtn');
  clearBtn.parentNode.removeChild(clearBtn);

}

function renderStaticImage(count) {
  //Creates canvas element to display image
  var imageLocation = document.getElementById('previousRound');
  var staticImage = document.createElement('img');
  staticImage.setAttribute('id', 'staticImage');
  staticImage.setAttribute('width', '500');
  staticImage.setAttribute('height', '500');

  changeId('previousRound', 'previousRoundSketch');

  var dataURL = localStorage.getItem('sketch' + count);
  staticImage.src = dataURL;
  imageLocation.appendChild(staticImage);
}

function clearForm() {
  var imageLocation = document.getElementById('previousRoundSketch');
  while (imageLocation.hasChildNodes()) {
    imageLocation.removeChild(imageLocation.firstChild);
  }

  var formLocation = document.getElementById('currentText');
  while (formLocation.hasChildNodes()) {
    formLocation.removeChild(formLocation.firstChild);
  }

  var buttonsLocation = document.getElementById('buttonsRight');
  while (buttonsLocation.hasChildNodes()) {
    buttonsLocation.removeChild(buttonsLocation.firstChild);
  }
}

function renderNextFormBtn() {
  var nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.id = 'nextBtn';
  var buttonsLocation = document.getElementById('buttonsRight');
  nextButton.addEventListener('click', generateTextFormPage);
  buttonsLocation.appendChild(nextButton);
}

function renderEndBtn() {
  var endButton = document.createElement('button');
  endButton.textContent = 'End Game';
  endButton.id = 'endBtn';
  var buttonsLocation = document.getElementById('buttonsRight');
  endButton.addEventListener('click', endGame);
  buttonsLocation.appendChild(endButton);
}

function renderTextForm() {
  changeId('currentRound', 'currentText');

  var form = document.createElement('form');
  // form.setAttribute('type', 'text');
  var input = document.createElement('textarea');
  input.setAttribute('placeholder', 'Guess what was drawn');
  input.setAttribute('autofocus', '');
  input.id = 'phraseInput';
  form.appendChild(input);
  var formLocation = document.getElementById('currentText');
  formLocation.appendChild(form);
}

function renderTextPhrase(count) {
  changeId('previousRoundSketch', 'previousRound')

  var phraseLocation = document.getElementById('previousRound');
  var printInstructions = document.createElement('h3');
  printInstructions.textContent = 'Draw this phrase:';
  phraseLocation.appendChild(printInstructions);
  var printTextPhrase = document.createElement('p');
  printTextPhrase.textContent = localStorage.getItem(
    'formPhrase' + count);
  phraseLocation.appendChild(printTextPhrase);
}

function renderTextPhraseEnd(count) {
  changeId('previousRoundSketch', 'previousRound');

  var phraseLocation = document.getElementById('previousRound');
  var printInstructions = document.createElement('h3');
  printInstructions.textContent = 'Round ' + count;
  phraseLocation.appendChild(printInstructions);
  var printTextPhrase = document.createElement('p');
  printTextPhrase.textContent = localStorage.getItem(
    'formPhrase' + count);
  phraseLocation.appendChild(printTextPhrase);
}

function renderNextSketchButton() {
  var btnLocation = document.getElementById('buttonsRight');
  //Create button element
  var btn = document.createElement('button');
  btn.textContent = 'Next';
  //set attribute id='nextBtn'
  btn.setAttribute('id', 'nextBtn');
  //add event listener to call generateSketchPadPage() when clicked
  btn.addEventListener('click', generateSketchPadPage);
  //append button to game.html
  btnLocation.appendChild(btn);
}

function renderResults () {
  for (var i = 1; i < roundCount; i++) {
    renderTextPhraseEnd(i);
    renderStaticImage(i);
  }
  renderTextPhraseEnd(i);
  changeId('previousRound', 'previousRoundSketch');
}

function changeId(previousID, newID) {
  var previousLocation = document.getElementById(previousID);
  previousLocation.removeAttribute('id');
  previousLocation.setAttribute('id', newID);
}

function playSound() {
  var audio = document.createElement('audio');
  audio.style.display = 'none';
  audio.src = 'assets/audio/mond.mp3';
  audio.autoplay = true;
  audio.loop = true;
  audio.currentTime = 390;
  document.body.appendChild(audio);
}
playSound();

//Draw Functions ==========================================================

var canvas,ctx;
var mouseX, mouseY, mouseDown = 0;
var touchX, touchY;

var lastX, lastY = -1;

function drawLine(ctx,x,y,size) {
  if (lastX == -1) {
    lastX = x;
    lastY = y;
  }

  ctx.strokeStyle = '#fff8f0';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(x,y);
  ctx.lineWidth = size;
  ctx.stroke();
  ctx.closePath();

  lastX = x;
  lastY = y;
}

function clearCanvas(canvas,ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function sketchpadMouseDown() {
  mouseDown = 1;
  drawLine(ctx, mouseX, mouseY, 6);
}

function sketchpadMouseUp() {
  mouseDown = 0;
  lastX = -1;
  lastY = -1;
}

function sketchpadMouseMove(e) {
  getMousePos(e);

  if (mouseDown == 1) {
    drawLine(ctx, mouseX, mouseY, 6);
  }
}

function getMousePos(e) {
  if (!e)
    e = event;

  if (e.offsetX) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  }
  else if (e.layerX) {
    mouseX = e.layerX;
    mouseY = e.layerY;
  }
}

function sketchpadTouchStart() {
  getTouchPos();
  drawLine(ctx,touchX,touchY,6);
  event.preventDefault();
}

function sketchpadTouchEnd() {
  lastX = -1;
  lastY = -1;
}

function sketchpadTouchMove(e) { 
  getTouchPos(e);
  drawLine(ctx,touchX,touchY,6);
  event.preventDefault();
}

function getTouchPos(e) {
  if (!e)
    e = event;

  if(e.touches) {
    if (e.touches.length == 1) {
      var touch = e.touches[0];
      touchX = touch.pageX - touch.target.parentNode.offsetLeft - 330;
      touchY = touch.pageY - touch.target.parentNode.offsetTop - 30;
    }
  }
}

function init() {
  canvas = document.getElementById('sketchpad');

  if (canvas.getContext)
    ctx = canvas.getContext('2d');

  if (ctx) {
    canvas.addEventListener('mousedown', sketchpadMouseDown, false);
    canvas.addEventListener('mousemove', sketchpadMouseMove, false);
    window.addEventListener('mouseup', sketchpadMouseUp, false);
    canvas.addEventListener('touchstart', sketchpadTouchStart, false);
    canvas.addEventListener('touchend', sketchpadTouchEnd, false);
    canvas.addEventListener('touchmove', sketchpadTouchMove, false);
  }
}

window.onload = startGame();