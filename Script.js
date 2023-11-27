var canvas = document.getElementById("Worm");
var canvas2d = canvas.getContext("2d");
var gameEnded = false;

var WormSegments = [];
var WormLength = 1;
var WormX = 0;
var WormY = 0;
var directionX = 10;
var directionY = 0;
var dots = [];
function moveWorm() {
  WormSegments.unshift({ x: WormX, y: WormY });
  WormX += directionX;
  WormY += directionY;
  while (WormSegments.length > WormLength) {
    WormSegments.pop();
  }
}
function drawWorm() {
  canvas2d.clearRect(0, 0, canvas.width, canvas.height);
  canvas2d.fillStyle = "black"; 
  for (var i = 0; i < WormSegments.length; i++) {
    canvas2d.fillRect(WormSegments[i].x, WormSegments[i].y, 10, 10);
  }
}
function gameLoop() {
  moveWorm();
  drawWorm();
  spawnDots();
  checkCollision();
  if(!gameEnded) {
    setTimeout(gameLoop, 100);
  }
}
gameLoop();
document.onkeydown = function(event) {
switch (event.keyCode) {
  case 37: // Left arrow
    directionX = -10;
    directionY = 0;
    break;
  case 38: // Up arrow
    directionX = 0;
    directionY = -10;
    break;
  case 39: // Right arrow
    directionX = 10;
    directionY = 0;
    break;
  case 40: // Down arrow
    directionX = 0;
    directionY = 10;
    break;
  }
};

function spawnDots() {
  if(dots.length < 8) {
    var dotX = Math.floor(Math.random() * canvas.width);
    var dotY = Math.floor(Math.random() * canvas.height);
    dots.push({ x: dotX, y: dotY });
  }
  for (var i = 0; i < dots.length; i++) {
    canvas2d.fillStyle = "blue";
    canvas2d.fillRect(dots[i].x, dots[i].y, 10, 10);
  }
}

function checkCollision() {
  for (var i = 0; i < dots.length; i++) {
    if (WormX < dots[i].x + 15 && 
      WormX + 15 > dots[i].x && 
      WormY < dots[i].y + 15 && 
      WormY + 15 > dots[i].y) {
        WormLength++;
        dots.splice(i, 1);
    }
  }
  if (WormX < -15 || 
    WormY < -15 || 
    WormX > canvas.width+15 ||
    WormY > canvas.height+15) {
      gameOver();
  }
  for (var i = 1; i < WormSegments.length; i++) {
    if (WormX === WormSegments[i].x && WormY === WormSegments[i].y) {
      gameOver();
    }
  }
}
function gameOver() {
  setTimeout(function() {
    alert("Game over!");
  }, 500); 
  gameEnded = true
}
function onButtonClick() {
    alert('Button clicked!');
  }
  const button = document.querySelector('button');
  button.addEventListener('click', onButtonClick);