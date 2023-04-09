// Set up the canvas of the game
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cellSize = 10;
let canvasWidth = canvas.width / cellSize;
let canvasHeight = canvas.height / cellSize;

// Set up the snake
let snake = [];
snake[0] = {
    x: Math.floor(canvasWidth / 2),
    y: Math.floor(canvasHeight / 2)
};
let dx = 1;
let dy = 0;

// Set up the food
let food = {
    x: Math.floor(Math.random() * canvasWidth),
    y: Math.floor(Math.random() * canvasHeight)
};

// Set up the score and highscore
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").textContent = highscore;

// Handle keyboard input
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37 && dx !== 1) { // left arrow
        dx = -1;
        dy = 0;
    } else if (event.keyCode === 38 && dy !== 1) { // up arrow
        dx = 0;
        dy = -1;
    } else if (event.keyCode === 39 && dx !== -1) { // right arrow
        dx = 1;
        dy = 0;
    } else if (event.keyCode === 40 && dy !== -1) { // down arrow
        dx = 0;
        dy = 1;
    }
});

// Move the snake and check for collisions
function moveSnake() {
    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * canvasWidth);
        food.y = Math.floor(Math.random() * canvasHeight);
        score++;
        document.getElementById("score").textContent = score;
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore);
            document.getElementById("highscore").textContent = highscore;
        }
    } else {
        snake.pop();
    }
    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
        clearInterval(gameInterval);
        alert("Game over!");
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval);
            alert("Game over!");
        }
    }
}

// Draw the snake and the food
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#333";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * cellSize, snake[i].y * cellSize, cellSize, cellSize);
    }
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

// Start the game loop
let gameInterval = setInterval(function() {
    moveSnake();
    draw();
}, 100);