const container = document.getElementById("container");
const resizeBtn = document.getElementById("resize-btn");

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}

function createGrid(size) {
  container.innerHTML = "";

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");

    gridSquare.style.width = `${squareSize}px`;
    gridSquare.style.height = `${squareSize}px`;

    gridSquare.dataset.interactions = "0";

    gridSquare.addEventListener("mouseenter", function () {
      let interactions = parseInt(this.dataset.interactions);

      if (interactions === 0) {
        const randomColor = getRandomRGB();
        this.style.backgroundColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
        this.style.opacity = "0.1";
      } else if (interactions < 10) {
        const newOpacity = (interactions + 1) * 0.1;
        this.style.opacity = newOpacity.toString();
      }

      if (interactions < 10) {
        this.dataset.interactions = (interactions + 1).toString();
      }
    });

    container.appendChild(gridSquare);
  }
}

function resizeGrid() {
  let newSize = prompt("Enter the number of squares per side (maximum 100):");

  if (newSize === null) {
    return;
  }

  newSize = parseInt(newSize);

  if (isNaN(newSize) || newSize <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  if (newSize > 100) {
    alert("Maximum size is 100. Please enter a smaller number.");
    return;
  }

  createGrid(newSize);
}

resizeBtn.addEventListener("click", resizeGrid);

createGrid(16);
