let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

function createBG() {
    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, 16*box, 16*box);
}

function createSnake() {
    for (i=0; i < snake.length; i++) {
        context.fillStyle = 'purple';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event) {
    if (event.keyCode == 37 && direction != 'right') {direction = 'left';}
    if (event.keyCode == 38 && direction != 'down') {direction = 'up';}
    if (event.keyCode == 39 && direction != 'left') {direction = 'right';}
    if (event.keyCode == 40 && direction != 'up') {direction = 'down';}
}

function startGame() {
    if (snake[0].x > 15*box && direction == 'right') {snake[0].x = 0;}
    if (snake[0].x < 0 && direction == 'left') {snake[0].x = 15*box;}
    if (snake[0].y > 15*box && direction == 'down') {snake[0].y = 0;}
    if (snake[0].y < 0 && direction == 'up') {snake[0].y = 15*box;}

    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over :(');
            window.location.reload();
        }
    }

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //The secondary conditions are necessary so the snake won't be hidden
    if (direction == 'right') {
        if (snakeX+box >= 16*box) {
            snakeX = 0;
        } else {
            snakeX += box;
        }
    }
    if (direction == 'left') {
        if (snakeX-box < 0) {
            snakeX = 15*box;
        } else {
            snakeX -= box;
        }
    }
    if (direction == 'up') {
        if (snakeY-box < 0) {
            snakeY = 15*box;
        } else {
            snakeY -= box;
        }
    }
    if (direction == 'down') {
        if (snakeY+box >= 16*box) {
            snakeY = 0;
        } else {
            snakeY += box;
        }
    }


    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        do {
            food.x = Math.floor(Math.random() * 16) * box;
            food.y = Math.floor(Math.random() * 16) * box;
        } while (snake.some(e => JSON.stringify(e) === JSON.stringify(food)));
    } //The do...while is necessary to avoid the food to appear 'on' the snake

    let newHead = {
        x: snakeX,
        y: snakeY
    }    

    snake.unshift(newHead); //creates the movement
}

let game = setInterval(startGame, 150);
