'use strict';
var roundCount = 0;

//Save initial text form on homepage to local storage, then clear html elements from homepage and render sketchpad, can set to start on event button click
//add event listener outside the function to run from form submit button (id="start) on index.html which starts game
function startGame() {
  renderTextPhrase(roundCount);
  renderSketchpad();
  draw();
  renderNextFormBtn();
}

//Save sketchpad image to local storage - can store using canvas.toDataURL(), then clear sketchpad, render saved drawing as static image and render new text form
function generateTextFormPage() {
  saveDrawing();
  clearSketchpad();
  renderStaticImage(roundCount);
  renderTextForm();
  renderNextSketchButton();
  renderEndBtn();
  roundCount++;
}

function generateSketchPadPage() {
  saveForm();
  clearForm();
  renderTextPhrase(roundCount);
  renderSketchpad();
  draw();
  renderNextFormBtn();
}

function endGame() {
  saveForm();
  clearForm();
  renderResults();
}

//rendering the canvas pad
function renderSketchpad() {
  var canvas = document.createElement('canvas');
  var sketchpadLocation = document.getElementById('currentRound');
  canvas.setAttribute('id', 'sketchpad');
  canvas.setAttribute('width', '500px');
  canvas.setAttribute('height', '500px');
  sketchpadLocation.appendChild(canvas);
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
  var sketchpad = document.getElementById('sketchpad');
  sketchpad.parentNode.removeChild(sketchpad);
  var btn = document.getElementById('nextBtn');
  btn.parentNode.removeChild(btn);
}

function renderStaticImage(count) {
  //Creates canvas element to display image
  var imageLocation = document.getElementById('previousRound');
  var staticImage = document.createElement('img');
  staticImage.setAttribute('id', 'staticImage');
  staticImage.setAttribute('width', '500');
  staticImage.setAttribute('height', '500');

  var dataURL = localStorage.getItem('sketch' + count);
  staticImage.src = dataURL;
  imageLocation.appendChild(staticImage);
}

function clearForm() {
  var imageLocation = document.getElementById('previousRound');
  while (imageLocation.hasChildNodes()) {
    imageLocation.removeChild(imageLocation.firstChild);
  }

  var formLocation = document.getElementById('currentRound');
  while (formLocation.hasChildNodes()) {
    formLocation.removeChild(formLocation.firstChild);
  }

  var buttonsLocation = document.getElementById('buttons');
  while (buttonsLocation.hasChildNodes()) {
    buttonsLocation.removeChild(buttonsLocation.firstChild);
  }
}

//next button
function renderNextFormBtn() {
  var nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.id = 'nextBtn';
  var buttonsLocation = document.getElementById('buttons');
  nextButton.addEventListener('click', generateTextFormPage);
  buttonsLocation.appendChild(nextButton);
}

//end button
function renderEndBtn() {
  var endButton = document.createElement('button');
  endButton.textContent = 'End Game';
  endButton.id = 'endBtn';
  var buttonsLocation = document.getElementById('buttons');
  endButton.addEventListener('click', endGame);
  buttonsLocation.appendChild(endButton);
}

//render text form
function renderTextForm() {
  var form = document.createElement('form');
  form.setAttribute('type', 'text');
  var input = document.createElement('input');
  input.id = 'phraseInput';
  form.appendChild(input);
  var formLocation = document.getElementById('currentRound');
  formLocation.appendChild(form);
}

function renderTextPhrase(count) {
  var phraseLocation = document.getElementById('previousRound');
  var printTextPhrase = document.createElement('p');
  printTextPhrase.textContent = localStorage.getItem(
    'formPhrase' + count);
  phraseLocation.appendChild(printTextPhrase);
}

function renderNextSketchButton() {
  var btnLocation = document.getElementById('buttons');
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
  for (var i = 0; i < roundCount; i++) {
    console.log(localStorage.getItem('formPhrase' + i));
    renderTextPhrase(i);
    renderStaticImage(i);
  }
  renderTextPhrase(i + 1);
}

function draw() {
  var sketchpad = document.getElementById('sketchpad');

  if (sketchpad) {
    if (sketchpad.getContext) {
      var context = sketchpad.getContext('2d');
    }
    sketchpad.addEventListener('mousedown', mouseDown, false);
    sketchpad.addEventListener('mousemove', mouseMoves, false);
    window.addEventListener('mouseup', mouseUp, false);
  }


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
}

window.onload = startGame();