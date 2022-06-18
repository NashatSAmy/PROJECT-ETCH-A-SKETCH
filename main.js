// Elements selectors.
const grid = document.getElementById("grid-system");
const gridSize = document.querySelector("[name=grid-size]");
const color = document.getElementsByName("color");
const reset = document.getElementsByName("reset");
const rainbowMode = document.getElementsByName("rainbow");
const easer = document.getElementsByName("erase");
const spn = document.querySelector("[name=on-off]");
const size = document.getElementsByName("gs");
const showGrid = document.getElementsByName("gridOn");
const root = document.querySelector(":root");

// Global variables.
let mouseDown = false;
let rainbowModeOn = false;
let easerOn = false;
let showGridOn = false;
let hue = 0;
let light = 100;

// Function that clear the grid system.
function clearGrid() {
  while (!grid.childElementCount <= 0) {
    grid.removeChild(grid.firstChild);
  }
}

// Function that will allow the user to make the grid visible.
function showingGrid() {
  showGridOn == true
    ? root.style.setProperty("--borderStyle", "1px solid rgba(0, 0, 0, 0.281)")
    : root.style.setProperty("--borderStyle", "none");
}

// Function that will populate the grid system with the right number of square divs.
function populateGridSystem() {
  size.forEach((s) => (s.innerText = gridSize.value));
  nX = gridSize.value;
  clearGrid();
  showingGrid();
  while (grid.childElementCount < nX * nX) {
    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("name", "grid-div");
    gridDiv.addEventListener("mouseenter", startDrawing);
    gridDiv.addEventListener("mouseenter", toggleRainbowMode);
    gridDiv.addEventListener("mouseenter", erasing);
    gridDiv.classList.add("gridDiv");
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
    rainbowModeOn == true ||
    easerOn == true
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

// Function that allow the user to erase.
function erasing(e) {
  if (
    e.target.getAttribute("name") == null ||
    !e.target.getAttribute("name") == "grid-div" ||
    mouseDown == false ||
    rainbowModeOn == true ||
    easerOn == false
  )
    return;
  e.target.style.backgroundColor = "#f5f5f5";
}

// Events listeners.
gridSize.addEventListener("input", populateGridSystem);
grid.addEventListener("mousedown", () => (mouseDown = true));
grid.addEventListener("mouseup", () => (mouseDown = false));
grid.addEventListener("mousedown", startDrawing);
grid.addEventListener("mousedown", toggleRainbowMode);
grid.addEventListener("mousedown", erasing);

rainbowMode[0].addEventListener(
  "click",
  () => (rainbowModeOn = !rainbowModeOn)
);

easer[0].addEventListener("click", () => (easerOn = !easerOn));

reset[0].addEventListener("click", populateGridSystem);

easer[0].addEventListener("click", () =>
  easer[0].classList.toggle("btn-active")
);
rainbowMode[0].addEventListener("click", () =>
  spn.innerText == "ON" ? (spn.innerText = "OFF") : (spn.innerText = "ON")
);
rainbowMode[0].addEventListener("click", () =>
  rainbowMode[0].classList.toggle("rainbow-active")
);

showGrid[0].addEventListener("click", () =>
  showGrid[0].classList.toggle("btn-active")
);
showGrid[0].addEventListener("click", () => {
  showGridOn = !showGridOn;
  showingGrid();
});

window.onload = populateGridSystem();
