'use strict';
var roundCount = 0;

//Save initial text form on homepage to local storage, then clear html elements from homepage and render sketchpad, can set to start on event button click
//add event listener outside the function to run from form submit button (id="start) on index.html which starts game
function startGame() {
  renderTextPhrase(roundCount);
  renderSketchpad();
  init()
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
  init();
  renderNextFormBtn();
}

function endGame() {
  saveForm();
  clearForm();
  renderResults();
  localStorage.clear();
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
  var previousForm = document.getElementById('previousRound');
  while (previousForm.hasChildNodes()) {
    previousForm.removeChild(previousForm.firstChild);
  }

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

  //Remove and change id for previousRound to previousRoundSketch
  var previousLocation = document.getElementById('previousRound');
  previousLocation.removeAttribute('id');
  previousLocation.setAttribute('id', 'previousRoundSketch');

  var dataURL = localStorage.getItem('sketch' + count);
  staticImage.src = dataURL;
  imageLocation.appendChild(staticImage);
}

function clearForm() {
  var imageLocation = document.getElementById('previousRoundSketch');
  while (imageLocation.hasChildNodes()) {
    imageLocation.removeChild(imageLocation.firstChild);
  }

  var formLocation = document.getElementById('currentRound');
  while (formLocation.hasChildNodes()) {
    formLocation.removeChild(formLocation.firstChild);
  }

  var buttonsLocation = document.getElementById('buttonsRight');
  while (buttonsLocation.hasChildNodes()) {
    buttonsLocation.removeChild(buttonsLocation.firstChild);
  }
}

//next button
function renderNextFormBtn() {
  var nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.id = 'nextBtn';
  var buttonsLocation = document.getElementById('buttonsRight');
  nextButton.addEventListener('click', generateTextFormPage);
  buttonsLocation.appendChild(nextButton);
}

//end button
function renderEndBtn() {
  var endButton = document.createElement('button');
  endButton.textContent = 'End Game';
  endButton.id = 'endBtn';
  var buttonsLocation = document.getElementById('buttonsRight');
  endButton.addEventListener('click', endGame);
  buttonsLocation.appendChild(endButton);
}

//render text form
function renderTextForm() {
  var form = document.createElement('form');
  form.setAttribute('type', 'text');
  var input = document.createElement('input');
  input.setAttribute('placeholder', "Guess what was drawn");
  input.id = 'phraseInput';
  form.appendChild(input);
  var formLocation = document.getElementById('currentRound');
  formLocation.appendChild(form);
}

function renderTextPhrase(count) {
  //Remove and change id for previousRound to previousRoundSketch
  var previousLocation = document.getElementById('previousRoundSketch');
  previousLocation.removeAttribute('id');
  previousLocation.setAttribute('id', 'previousRound');

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
  //Remove and change id for previousRound to previousRoundSketch
  var previousLocation = document.getElementById('previousRoundSketch');
  previousLocation.removeAttribute('id');
  previousLocation.setAttribute('id', 'previousRound');

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
  for (var i = 0; i < roundCount; i++) {
    renderTextPhraseEnd(i);
    renderStaticImage(i);
  }
  renderTextPhraseEnd(i + 1);
}

// function draw() {
//   var sketchpad = document.getElementById('sketchpad');

//   if (sketchpad) {
//     if (sketchpad.getContext) {
//       var context = sketchpad.getContext('2d');
//     }
//     sketchpad.addEventListener('mousedown', mouseDown, false);
//     sketchpad.addEventListener('mousemove', mouseMoves, false);
//     window.addEventListener('mouseup', mouseUp, false);
//   }


//   function draw(context, x, y, size) {
//     var r = 0;
//     var g = 0;
//     var b = 0;
//     var a = 255;

//     context.fillStyle = '#fff8f0';
//     context.beginPath();
//     context.beginPath();
//     context.arc(x, y, size, 0, Math.PI * 2, true);
//     context.closePath();
//     context.fill();
//   }

//   var mouseX = 0;
//   var mouseY = 0;
//   var mouseClicked = 0;

//   function mouseDown() {
//     mouseClicked = 1;
//     draw(context, mouseX, mouseY, 5);
//   }

//   function mouseUp() {
//     mouseClicked = 0;
//   }

//   function mouseMoves(e) {
//     getMousePosition(e);
//     if (mouseClicked == 1) {
//       draw(context, mouseX, mouseY, 5);
//     }
//   }

//   function getMousePosition(e) {
//     if (!e) {
//       var e = event;
//     }
//     if (e.offsetX) {
//       mouseX = e.offsetX;
//       mouseY = e.offsetY;
//     } else if (e.layerX) {
//       mouseX = e.layerX;
//       mouseY = e.layerY;
//     }
//   }
// }

// Variables for referencing the canvas and 2dcanvas context
var canvas,ctx;

// Variables to keep track of the mouse position and left-button status 
var mouseX, mouseY, mouseDown = 0;

// Variables to keep track of the touch position
var touchX, touchY;

// Keep track of the old/last position when drawing a line
// We set it to -1 at the start to indicate that we don't have a good value for it yet
var lastX, lastY = -1;

// Draws a line between the specified position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawLine(ctx,x,y,size) {

  // If lastX is not set, set lastX and lastY to the current position
  if (lastX == -1) {
    lastX = x;
    lastY = y;
  }

  // Select a fill style
  ctx.strokeStyle = '#fff8f0';

  // Set the line "cap" style to round, so lines at different angles can join into each other
  ctx.lineCap = 'round';
  //ctx.lineJoin = "round";


  // Draw a filled line
  ctx.beginPath();

  // First, move to the old (previous) position
  ctx.moveTo(lastX,lastY);

  // Now draw a line to the current touch/pointer position
  ctx.lineTo(x,y);

  // Set the line thickness and draw the line
  ctx.lineWidth = size;
  ctx.stroke();

  ctx.closePath();

  // Update the last position to reference the current position
  lastX = x;
  lastY = y;
} 

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpadMouseDown() {
  mouseDown = 1;
  drawLine(ctx, mouseX, mouseY, 6);
}

// Keep track of the mouse button being released
function sketchpadMouseUp() {
  mouseDown = 0;

  // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
  lastX = -1;
  lastY = -1;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpadMouseMove(e) { 
  // Update the mouse co-ordinates when moved
  getMousePos(e);

  // Draw a dot if the mouse button is currently being pressed
  if (mouseDown == 1) {
    drawLine(ctx, mouseX, mouseY, 6);
  }
}

// Get the current mouse position relative to the top-left of the canvas
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

// Draw something when a touch start is detected
function sketchpadTouchStart() {
  // Update the touch co-ordinates
  getTouchPos();

  drawLine(ctx,touchX,touchY,6);

  // Prevents an additional mousedown event being triggered
  event.preventDefault();
}

function sketchpadTouchEnd() {
  // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
  lastX = -1;
  lastY = -1;
}

// Draw something and prevent the default scrolling when touch movement is detected
function sketchpadTouchMove(e) { 
  // Update the touch co-ordinates
  getTouchPos(e);

  // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
  drawLine(ctx,touchX,touchY,6);
  
  // Prevent a scrolling action as a result of this touchmove triggering.
  event.preventDefault();
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
  if (!e)
    e = event;

  if(e.touches) {
    if (e.touches.length == 1) { // Only deal with one finger
      var touch = e.touches[0]; // Get the information for finger #1
      touchX = touch.pageX - touch.target.parentNode.offsetLeft;
      console.log(touch.target);
      touchY = touch.pageY - touch.target.parentNode.offsetTop;
    }
  }
}


// Set-up the canvas and add our event handlers after the page has loaded
function init() {
  // Get the specific canvas element from the HTML document
  canvas = document.getElementById('sketchpad');

  // If the browser supports the canvas tag, get the 2d drawing context for this canvas
  if (canvas.getContext)
    ctx = canvas.getContext('2d');

  // Check that we have a valid context to draw on/with before adding event handlers
  if (ctx) {
    // React to mouse events on the canvas, and mouseup on the entire document
    canvas.addEventListener('mousedown', sketchpadMouseDown, false);
    canvas.addEventListener('mousemove', sketchpadMouseMove, false);
    window.addEventListener('mouseup', sketchpadMouseUp, false);

    // React to touch events on the canvas
    canvas.addEventListener('touchstart', sketchpadTouchStart, false);
    canvas.addEventListener('touchend', sketchpadTouchEnd, false);
    canvas.addEventListener('touchmove', sketchpadTouchMove, false);
  }
}

window.onload = startGame();