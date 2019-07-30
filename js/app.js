'use strict';
function saveForm() {
  var userInput = document.getElementById('userInput').value;
  localStorage.setItem('formPhrase0', userInput);
}

function startButton() {
  saveForm();
  window.location.href = 'game.html';
}

var btnLocation = document.getElementById('startBtn');
btnLocation.addEventListener('click', startButton)
