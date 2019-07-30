'use strict';
var roundCount = 0;

//Save initial text form on homepage to local storage, then clear html elements from homepage and render sketchpad, can set to start on event button click
//add event listener outside the function to run from form submit button (id="start) on index.html which starts game
function startGame() {
  saveForm();
  renderTextPhrase();
  renderSketchpad();
  renderNextFormBtn();
}

//Save sketchpad image to local storage - can store using canvas.toDataURL(), then clear sketchpad, render saved drawing as static image and render new text form
function generateTextFormPage() {
  saveDrawing();
  clearSketchpad();
  renderStaticImage();
  renderTextForm();
  renderNextSketchButton();
  renderEndBtn();
  roundcount++;
}

function generateSketchPadPage() {
  saveForm();
  clearForm();
  renderTextPhrase();
  renderSketchpad();
  renderNextFormBtn(); 
}

function endGame() {
  saveForm();
  clearForm();
  renderResults();
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
  var sketchpadLocation = document.getElementById('currentRound');
  while(sketchpadLocation.hasChildNodes()) {
    sketchpadLocation.removeChild(sketchpadLocation.firstChild);
  }
}

function renderStaticImage() {
  //Creates canvas element to display image
  var imageLocation = document.getElementById('previousRound');
  var staticImage = document.createElement('canvas');
  staticImage.setAttribute('id', 'staticImage');
  imageLocation.appendChild(staticImage);

  if (staticImage.getContext) {
    var context = staticImage.getContext('2d');
  }

  var dataURL = localStorage.getItem('sketch' + roundCount);
  var img = new Image();
  img.src = dataURL;
  context.drawImage(img, 0, 0);
}

function clearForm() {
  var imageLocation = document.getElementById('previousRound');
  while(imageLocation.hasChildNodes()) {
    imageLocation.removeChild(imageLocation.firstChild);
  }

  var formLocation = document.getElementById('currentRound');
  while(formLocation.hasChildNodes()) {
    formLocation.removeChild(formLocation.firstChild);
  }
}