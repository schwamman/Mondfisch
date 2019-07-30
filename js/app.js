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

//next button 
// 1. Create the button
var nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.id ='nextBtn';

// 2. Append to game
var bodyLocation = document.getElementById("gameBody");
bodyLocation.appendChild(button);

// 3. Add event handler
button.addEventListener ("click", generateTextFormPage);
