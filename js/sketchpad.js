'use strict';











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