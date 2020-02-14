var canvas = document.getElementById("canvas");

var context = canvas.getContext("2d");

var score = 0;

var x = 50;
var y = 100;
var speed = 6;
var sideLength = 50;

var down = false;
var up = false;
var right = false;
var left = false;

var targetX = 0;
var targetY = 0;
var targetLength = 35;

function isWithin(a, b, c) {
    return a > b && a < c;
}

var countdown = 30;

var id = null;

canvas.addEventListener("keydown", function(event) {
    event.preventDefault();
    console.log(event.key, event.keyCode);
    if (event.keyCode === 40) {
        down = true;
    }
    if (event.keyCode === 38) {
        up = true;
    }
    if (event.keyCode === 37) {
        left = true;
    }
    if (event.keyCode === 39) {
        right = true;
    }
});

canvas.addEventListener("keyup", function(event) {
    event.preventDefault();
    console.log(event.key, event.keyCode);
    if (event.keyCode === 40) {
        down = false;
    }
    if (event.keyCode === 38) {
        up = false;
    }
    if (event.keyCode === 37) {
        left = false;
    }
    if (event.keyCode === 39) {
        right = false;
    }
});

function menu() {
    erase();
    countdown = 30;
    score = 0;
    context.fillStyle = "#000000";
    context.font = "36px Arial";
    context.textAlign = "center";
    var name = localStorage.getItem("player");
    context.fillText(name + " is welcomed!", canvas.width / 2, canvas.height / 4);
    context.font = "24px Arial";
    context.fillText("Click to Start", canvas.width / 2, canvas.height / 2);
    context.font = "18px Arial";
    context.fillText(
        "Use the arrow keys to move",
        canvas.width / 2,
        (canvas.height / 4) * 3
    );

    canvas.addEventListener("click", startGame);
}

function startGame() {
    id = setInterval(function() {
        countdown--;
    }, 1000);

    canvas.removeEventListener("click", startGame);

    moveTarget();

    draw();
}

var rose = new Image();
rose.src = "rose.png";

function endGame() {
    clearInterval(id);

    if (localStorage.getItem("high-score") < score) {
        localStorage.setItem("high-score", score)
    }


    erase();
    context.fillStyle = "#000000";
    context.font = "24px Arial";
    context.textAlign = "center";
    context.fillText(
        "Final Score: " + score,
        canvas.width / 2,
        canvas.height / 2
    );
    canvas.addEventListener("click", menu);
    context.fillText(
        "Click to restart game!",
        canvas.width / 2,
        0.75 * canvas.height
    );
    context.fillText("Highest Score: " + localStorage.getItem("high-score"), 0.8 * canvas.width, 0.1 * canvas.height);


}

function moveTarget() {
    targetX = Math.round(Math.random(0.2, 0.9) * canvas.width);
    targetY = Math.round(Math.random(0.2, 0.9) * canvas.height);
}

function erase() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 600, 400);
}

function draw() {
    erase();

    if (down) {
        y += speed;
    }
    if (up) {
        y -= speed;
    }
    if (right) {
        x += speed;
    }
    if (left) {
        x -= speed;
    }

    if (y + sideLength > canvas.height) {
        y = canvas.height - sideLength;
    }
    if (y < 0) {
        y = 0;
    }
    if (x < 0) {
        x = 0;
    }
    if (x + sideLength > canvas.width) {
        x = canvas.width - sideLength;
    }

    if (
        isWithin(targetX, x, x + sideLength) ||
        isWithin(targetX + targetLength, x, x + sideLength)
    ) {
        if (
            isWithin(targetY, y, y + sideLength) ||
            isWithin(targetY + targetLength, y, y + sideLength)
        ) {
            moveTarget();

            score++;
        }
    }

    context.fillStyle = "#FF0000";
    context.fillRect(x, y, sideLength, sideLength);

    // context.fillStyle = "#00FF00";
    // context.fillRect(targetX, targetY, targetLength, targetLength);

    context.drawImage(rose, targetX, targetY, targetLength, targetLength);


    context.fillStyle = "#000000";
    context.font = "24px Arial";
    context.textAlign = "left";
    context.fillText("Score: " + score, 10, 24);
    context.fillText("Time Remaining: " + countdown, 10, 50);

    if (countdown <= 0) {
        endGame();
    } else {
        window.requestAnimationFrame(draw);
    }
}
localStorage.setItem("high-score", 0);
menu();
canvas.focus();