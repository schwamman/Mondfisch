'use strict';
var roundCount = 0;


//Save initial text form on homepage to local storage, then clear html elements from homepage and render sketchpad, can set to start on event button click
saveForm();
clearStartPage();
renderSketchpad();


//Save sketchpad image to local storage - can store using canvas.toDataURL(), then clear sketchpad, render saved drawing as static image and render new text form, start on another event button click once the user was done drawing
saveDrawing();
clearSketchPage();
//-Need to increment roundCount
renderTextForm();

//