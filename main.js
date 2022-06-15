// Elements selectors.
const grid = document.getElementById("grid-system");
const gridSize = document.querySelector("[name=grid-size]");
const color = document.getElementsByName("pickAColor");
const reset = document.getElementsByName("reset");
const rainbowMode = document.getElementsByName("rainbow");

// Global variables.
let mouseDown = false;
let rainbowModeOn = false;
let hue = 0;
let light = 100;

// Function that clear the grid system.
function clearGrid() {
  while (!grid.childElementCount <= 0) {
    grid.removeChild(grid.firstChild);
  }
}

// Function that will populate the grid system with the right number of square divs.
function populateGridSystem() {
  nX = gridSize.value
  clearGrid();
  while (grid.childElementCount < nX * nX) {
    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("name", "grid-div");
    gridDiv.addEventListener("mouseenter", startDrawing);
    gridDiv.addEventListener("mouseenter", toggleRainbowMode);
    grid.appendChild(gridDiv);
  }
  grid.style.gridTemplateRows = `repeat(${nX}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${nX}, 1fr)`;
}

// Function that allow the user to start drawing.
function startDrawing(e) {
  if (rainbowModeOn == true) {
    toggleRainbowMode(e);
  }
  if (
    e.target.getAttribute("name") == null ||
    !e.target.getAttribute("name") == "grid-div" ||
    mouseDown == false ||
    rainbowModeOn == true
  )
    return;
  e.target.style.backgroundColor = color[0].value;
}

// Function that turnon the rainbow color mode.
function toggleRainbowMode(e) {
  if (
    e.target.getAttribute("name") == null ||
    !e.target.getAttribute("name") == "grid-div" ||
    mouseDown == false ||
    rainbowModeOn == false
  )
    return;
  e.target.style.backgroundColor = `hsl(${hue}, 100%, ${light}%)`;
  hue <= 359 ? hue++ : (hue = 0);
  light <= 0 ? (light = 100) : (light -= 10);
}


// Events listeners.
gridSize.addEventListener("input", populateGridSystem);
grid.addEventListener("mousedown", () => (mouseDown = true));
grid.addEventListener("mouseup", () => (mouseDown = false));

grid.addEventListener("mousedown", startDrawing);
grid.addEventListener("mousedown", toggleRainbowMode);

rainbowMode[0].addEventListener(
  "click",
  () => (rainbowModeOn = !rainbowModeOn)
);

reset[0].addEventListener("click", populateGridSystem);

window.onload = populateGridSystem()