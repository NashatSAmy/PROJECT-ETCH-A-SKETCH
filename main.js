// Elements selectors.
const grid = document.getElementById("grid-system");
const gridSize = document.querySelectorAll("[name=grid-size]");
const color = document.getElementsByName("pickAColor");

// Function that clear the grid system.
function clearGrid() {
  while (!grid.childElementCount <= 0) {
    grid.removeChild(grid.firstChild);
  }
}

// Function that will populate the grid system with the right number of square divs.
function populateGridSystem(nX, nY) {
  nX = +gridSize[0].value;
  nY = +gridSize[1].value;
  nX > 100 ? (nX = 100) : (nX = nX);
  nY > 100 ? (nY = 100) : (nY = nY);
  if (nX <= 0 || nY <= 0) return;
  clearGrid();
  while (grid.childElementCount < nX * nY) {
    const gridDiv = document.createElement("div");
    gridDiv.setAttribute("name", "grid-div");
    grid.appendChild(gridDiv);
  }
  grid.style.gridTemplateRows = `repeat(${nX}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${nY}, 1fr)`;
}

// Function that allow the user to start drawing.
function startDrawing(e) {
  if (
    e.target.getAttribute("name") == null ||
    !e.target.getAttribute("name") == "grid-div"
  )
    return;
  e.target.style.backgroundColor = color[0].value;
}

gridSize.forEach((line) => line.addEventListener("input", populateGridSystem));
grid.addEventListener("mousemove", startDrawing);
