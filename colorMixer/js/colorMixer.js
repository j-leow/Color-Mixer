/**************************************
 TITLE: colorMixer.js
 AUTHOR: Jules Leow
 CLASS: NEWM-N220
 CREATE DATE: 02/13/2018
Purpose: An application that will start a div at a black color, and as a user presses buttons associated with RGB, the div will change to new colors.
 Date: 04/02/2018
 Modification History:
 04/02/2018: Original Build
 04/03/2018: Tried for loops to iterate through the properties of the color objects
 04/04/2018: Learned to use event.target as a way to create one function to affect multiple DOM elements
 04/04/2018: Added function to cycle through results colors
***************************************/

// Define array of colors for the left and middle div - red, green, and blue
var colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]];
var targetColors = [[255, 0, 0], [255, 0, 255], [255, 255, 0], [0, 0, 255], [0, 255, 255], [255, 0, 255], [0, 255,0], [255, 255, 0], [0, 255, 255]];

// Color index is the index of the currently selected inner array from the colors array
var currentColorIdx = 0; 
var currentTargetColorIdx = 0;

// Select all divs for the left and middle divs
var colorSource = document.querySelectorAll(".colorSource");

// Select right div
var colorTarget = document.querySelector("#colorTarget");

// Loop through all the targets, put the same event listener on each
for (var i = 0; i < colorSource.length; i++) {
  colorSource[i].addEventListener('click', changeColor);
}

// Add event listener to the right div
colorTarget.addEventListener('click', changeTargetColor);

//Function to change color
// Use modulus operator to "loop" through the arrays
function changeColor(event) {
  var r = colors[currentColorIdx][0];
  var g = colors[currentColorIdx][1];
  var b = colors[currentColorIdx][2];
  
  var color = "rgb("+r+","+g+","+b+")";
  
  event.target.style.backgroundColor = color;
  console.log(color);
  
  currentColorIdx = (currentColorIdx + 1) % colors.length
}

// Function to control only the right div, and cycle through the blended color list
function changeTargetColor(event) {
  var r = targetColors[currentTargetColorIdx][0];
  var g = targetColors[currentTargetColorIdx][1];
  var b = targetColors[currentTargetColorIdx][2];
  
  var color = "rgb("+r+","+g+","+b+")";
  
  event.target.style.backgroundColor = color;
  console.log(color);
  
  currentTargetColorIdx = (currentTargetColorIdx + 1) % targetColors.length
}