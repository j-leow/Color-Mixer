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
 04/05/2018: Removed target color div's array - replaced with object. Experimented with ES6.
***************************************/

// Define array of colors for the left and middle div - red, green, and blue 
//Leave them as arrays so that I can use different methods 
var leftColors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]];

// All possible colors for the right div - make this into an object - each property is then also an object to store values for r, g, and b.
var rightColors = {
  "red" : { "r" : 255, "g" : 0, "b" : 0 },
  "magenta" : { "r" : 255, "g" : 0, "b" : 255 },
  "yellow" : { "r" : 255, "g" : 255, "b" : 0 },
  "blue" : { "r" : 0, "g" : 255, "b" : 0 },
  "cyan" : { "r" : 0, "g" : 255, "b" : 255 },
  "green" : { "r" : 0, "g" : 255, "b" : 0 },
}

// Select all divs for the left and middle divs
var colorSource = document.getElementsByClassName("colorSource");

// Select right div - specifically the style
var colorTarget = document.querySelector("#colorTarget").style;

// Set the variable for the initial right div's color
var currentRightColor;

// Create a dictionary to store the current index of each div of colorSource
var indexes = [];

/* Function to handle click event
 * First change color of the clicked div
 * Click to see if new blend is match for target blend.
 * If match, then set right color to random color - show alert.
*/

var handleClickEvent = function(event) {
  console.log("Click source is: " + event.target.id);
  changeLeftColor(event);

  var rightColor = getCurrentRightColor();
  var leftBlend = getCurrentLeftBlend();

  //Check to see that the r, g, b values are correct
  console.log("left blend : rgb("+leftBlend.r+", "+leftBlend.g+", "+leftBlend.b+")");
  console.log("right color : rgb("+rightColor.r+", "+rightColor.g+", "+rightColor.b+")");

  if (leftBlend.r == rightColor.r && leftBlend.b == rightColor.b && leftBlend.g == rightColor.g) {
    window.alert("Successfully matched colors. Generating new right div.");
    var newColor = getRandomColor(rightColors);
    setRightColor(newColor);
  }
}

//Function to change color and increment the index.
// (Note: index[event.target.id] uses the id of the event as a reference into the indexes dictionary)
// Use modulus operator to "loop" through the arrays
var changeLeftColor = function(event) {
  indexes[event.target.id] = (indexes[event.target.id] + 1) % leftColors.length;

  var r = leftColors[indexes[event.target.id]][0];
  var g = leftColors[indexes[event.target.id]][1];
  var b = leftColors[indexes[event.target.id]][2];
  
  var color = "rgb("+r+","+g+","+b+")";
  
  event.target.style.backgroundColor = color;
}

// Vanilla JS version of adding event listener:
// Loop through all the targets, put the same event listener on each
for (var i = 0; i < colorSource.length; i++) {
  colorSource[i].addEventListener('click', changeLeftColor, false);
  indexes[colorSource[i].id] = 0;
  indexes.length++;
}
