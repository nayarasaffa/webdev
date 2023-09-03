// Inisialisasi Variable

// Board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Moomin (Icon)
let moominWidth = 88;
let moominHeight = 94;
let moominX = 50;
let moominY = boardHeight - moominHeight;
let moominImg;

let moomin = {
  x: moominX,
  y: moominY,
  width: moominWidth,
  height: moominHeight,
};

// Obstacle
let obstacleArray = [];

let obstacle2Width = 69;
let obstacle1Width = 50;
let obstacle3Width = 102;

let obstacleHeight = 70;
let obstacleX = 700;
let obstacleY = boardHeight - obstacleHeight;

let obstacle2Img;
let obstacle1Img;
let obstacle3Img;

// Physics
let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

// On load function
window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;

  // Drawing on the board
  context = board.getContext("2d");

  // Moomin (Icon) Settings
  moominImg = new Image();
  moominImg.src = "assets/moomin.png";
  moominImg.onload = function () {
    context.drawImage(
      moominImg,
      moomin.x,
      moomin.y,
      moomin.width,
      moomin.height
    );
  };

  // Obstacle Settings
  obstacle2Img = new Image();
  obstacle2Img.src = "assets/obstacle-2.png";

  obstacle1Img = new Image();
  obstacle1Img.src = "assets/obstacle-1.png";

  obstacle3Img = new Image();
  obstacle3Img.src = "assets/obstacle-3.png";

  requestAnimationFrame(update);
  setInterval(placeObstacle, 1000);
  document.addEventListener("keydown", moveMoomin);
};

// Memperbarui gambar pada layar
function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }

  context.clearRect(0, 0, board.width, board.height);

  // Moomin (Icon)
  velocityY += gravity;
  moomin.y = Math.min(moomin.y + velocityY, moominY);
  context.drawImage(moominImg, moomin.x, moomin.y, moomin.width, moomin.height);

  // Obstacle
  for (let i = 0; i < obstacleArray.length; i++) {
    let obstacle = obstacleArray[i];
    obstacle.x += velocityX;
    context.drawImage(
      obstacle.img,
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );

    // If icon hit the obstacles
    if (detectCollison(moomin, obstacle)) {
      gameOver = true;
      moominImg.src = "assets/moomin-dead.png";
      context.clearRect(moomin.x, moomin.y, moomin.width, moomin.height);

      // Show Game Over Text
      context.fillStyle = "white";
      context.font = '20px "Press Start 2P", cursive';

      var textWidth = context.measureText("GAME OVER").width;

      var centerX = (board.width - textWidth) / 2;
      var centerY = board.height / 2;

      context.fillText("GAME OVER", centerX, centerY);
    }

    // Score
    context.fillStyle = "white";
    context.font = '13px "Press Start 2P", cursive';
    score++;
    context.fillText("Score: " + score, 5, 20);
  }
}

// Mengatur pergerakan Moomin (Icon)
function moveMoomin(e) {
  if (gameOver) {
    return;
  }

  if ((e.code == "Space" || e.code == "ArrowUp") && moomin.y == moominY) {
    // jump
    velocityY = -10;
  }
}

// Menambahkan obstacle random
function placeObstacle() {
  if (gameOver) {
    return;
  }

  let obstacle = {
    img: null,
    x: obstacleX,
    y: obstacleY,
    width: null,
    height: obstacleHeight,
  };

  let placeObstacleChance = Math.random();
  if (placeObstacleChance > 0.7) {
    obstacle.img = obstacle3Img;
    obstacle.width = obstacle3Width;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > 0.5) {
    obstacle.img = obstacle2Img;
    obstacle.width = obstacle2Width;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > 0.3) {
    obstacle.img = obstacle1Img;
    obstacle.width = obstacle1Width;
    obstacleArray.push(obstacle);
  }

  if (obstacleArray.length > 5) {
    obstacleArray.shift();
  }
}

// Mendeteksi tabrakan
function detectCollison(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
