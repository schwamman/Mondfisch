"use strict";
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

//next button
function nextButton() {
  var nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.id = "nextBtn";
  var buttonsLocation = document.getElementById("buttons");
  buttonsLocation.appendChild(button);
  button.addEventListener("click", generateTextFormPage);
}

//end button
function endButton() {
  var endButton = document.createElement("button");
  endButton.textContent = "End Game";
  endButton.id = "endBtn";
  var buttonsLocation = document.getElementById("buttons");
  buttonsLocation.appendChild(button);
  button.addEventListener("click", endGame);
}

//render text form
function renderTextForm() {
  var form = document.createElement('form');
  form.setAttribute("type", "text");
  form.id='phraseInput';
  var input = document.createElement('input');
  form.appendChild(input);
  var formLocation = document.getElementById("currentRound");
  formLocation.appendChild(form);
}

function saveForm() {
  var userInput = document.getElementById("phraseInput").value;
  localStorage.setItem("formPhrase" + roundCount, userInput);
}

function saveDrawing() {
  var userSketch = document.getElementById("sketchpad");
  localStorage.setItem("sketch" + roundCount, userSketch.toDataURL());
}

function clearSketchpad() {
  var sketchpad = document.getElementById("sketchpad");
  sketchpad.parentNode.removeChild(sketchpad);
}


function renderTextPhrase() {
  var printTextPhrase = document.createElement('p');
  printTextPhrase.textContent = localStorage.setItem('formPhrase ' + roundCount);
  printTextPhrase.appendChild(placeHolderID);
}

function renderNextSketchButton() {
  //Create button element
  var btn = document.createElement('button');
  //set attribute id='nextBtn'
  btn.setAttribute('nextBtn');
  //add event listener to call generateSketchPadPage() when clicked
  document.getElementById('nextBtn').addEventListener("click", generateSketchPadPage());
  //append button to game.html
  btn.appendChild(nextBtn);
}
