let WIDTH = 1024;
let HEIGHT = 1024;
let columns;
let rows;
let resolution = 16;

let grid;
let newGrid;
let neighboursGrid;

let randomSpawn = 0;

let isPaused = true;

function setup() {
  frameRate(60);
  createCanvas(WIDTH, HEIGHT);

  columns = WIDTH / resolution;
  rows = HEIGHT / resolution;

  grid = makeGrid(columns, rows);
  newGrid = makeGrid(columns, rows);
  neighboursGrid = makeGrid(columns, rows);

  for (let x = 0; x < grid.length; ++x) {
    for (let y = 0; y < grid[x].length; ++y) {
      grid[x][y] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  render()

  if (!isPaused) {
    calculate()
    generate()

    for (let x = 0; x < columns; ++x) {
      for (let y = 0; y < rows; ++y) {
        grid[x][y] = newGrid[x][y];
      }
    }
  }

  /*for (let i = 0; i < 10; i++) {
    if (randomSpawn % 30 == 0) {
      let x = floor(WIDTH * random(1) / resolution);
      let y = floor(HEIGHT * random(1) / resolution);

      grid[x][y] = 1;
    }
  }

  randomSpawn++;*/

  fill(255);
  textSize(32);
  text(floor(getFrameRate()), 10, 30);
}

function keyPressed() {
  if (keyCode === ENTER) {
    isPaused = !isPaused;
    /*calculate()
    generate()

    for (let x = 0; x < columns; ++x) {
      for (let y = 0; y < rows; ++y) {
        grid[x][y] = newGrid[x][y];
      }
    }*/
  }
}

function render() {
  for (let x = 0; x < columns; ++x) {
    for (let y = 0; y < rows; ++y) {
      if (grid[x][y] == 1) {
        fill(255)
        stroke(16)
        rect(x * resolution, y * resolution, resolution, resolution);
      }
      if (grid[x][y] == 0) {
        fill(0)
        stroke(16)
        strokeWeight(1)
        rect(x * resolution, y * resolution, resolution, resolution);
      }
    }
  }
}

function calculate() {
  for (let x = 0; x < columns; ++x) {
    for (let y = 0; y < rows; ++y) {
      let aliveNeighbours = 0

      for (let i = -1; i <= 1; ++i) {
        for (let j = -1; j <= 1; ++j) {
          let xCheck = (x + i + columns) % columns;
          let yCheck = (y + j + rows) % rows;

          if (xCheck == x && yCheck == y) {
            continue;
          }

          aliveNeighbours += grid[xCheck][yCheck];
        }
      }

      neighboursGrid[x][y] = aliveNeighbours;
    }
  }
}

function generate() {
  for (let x = 0; x < columns; ++x) {
    for (let y = 0; y < rows; ++y) {
      let aliveNeighbours = neighboursGrid[x][y]

      if (grid[x][y] == 1 && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
        newGrid[x][y] = 0;
        continue;
      }

      if (grid[x][y] == 0 && (aliveNeighbours == 3)) {
        newGrid[x][y] = 1;
        continue;
      }

      /*if (grid[x][y] == 1 && aliveNeighbours < 4) {
        newGrid[x][y] = 0;
        continue;
      }

      if (grid[x][y] == 0 && aliveNeighbours >= 5) {
        newGrid[x][y] = 1;
        continue;
      }*/

      newGrid[x][y] = grid[x][y];
    }
  }
}

function makeGrid(columns, rows) {
  let arr = Array(columns);

  for (let i = 0; i < arr.length; ++i) {
    arr[i] = Array(rows);
  }
  return arr
}

function mousePressed() {
  let x = floor(mouseX / resolution);
  let y = floor(mouseY / resolution);

  if (grid[x][y] == 1)
    grid[x][y] = 0;
  else
    grid[x][y] = 1;
}