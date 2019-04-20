function play() {
    let score = 0;

    let canvas = document.getElementById("game");
    let context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let x = getRandomInteger(20, canvas.width - 20);
    let y = canvas.height / 2 + canvas.height / 5;

    let ballRadius = 15;
    let ballSpeed = 15;

    let dx = ballSpeed;
    let dy = -ballSpeed;

    let paddleHeight = canvas.height / 30;
    let paddleWidth = canvas.width / 5;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let paddleSpeed = ballSpeed;

    let isRightPressed = false;
    let isLeftPressed = false;

    let brickRowCount = 2;
    let brickColumnCount = 10;
    let brickPadding = canvas.width / 20;

    let brickWidth = canvas.width / brickColumnCount - brickPadding;
    let brickHeight = brickWidth / 2;

    let brickOffsetTop = 30;
    let bricks = [];

    let isGameOver = false;

    InitializeBricks();

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    let xDown = null;
    let yDown = null;

    function getTouches(e) {
        return e.touches ||          // browser API
            e.originalEvent.touches; // jQuery
    }

    function handleTouchStart(e) {
        const firstTouch = getTouches(e)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    function handleTouchMove(e) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
                /* left swipe */
                isLeftPressed = true;
            } else {
                /* right swipe */
                isRightPressed = true;
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };

    function handleTouchEnd(e){
        isLeftPressed = false;
        isRightPressed = false;
    }

    function keyDownHandler(e) {
        if (e.key == "d" || e.key == "ArrowRight") {
            isRightPressed = true;
        }
        else if (e.key == "a" || e.key == "ArrowLeft") {
            isLeftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "d" || e.key == "ArrowRight") {
            isRightPressed = false;
        }
        else if (e.key == "a" || e.key == "ArrowLeft") {
            isLeftPressed = false;
        }
    }

    function InitializeBricks() {

        for (var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    function draw() {

        resetContext();
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        collisionDetection();
        calculatePosition();


        if (isRightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += paddleSpeed;
        }
        else if (isLeftPressed && paddleX > 0) {
            paddleX -= paddleSpeed;
        }

        x += dx;
        y += dy;

        let frame = requestAnimationFrame(draw);

        if (isGameOver) {
            gameOver(frame);
        }
    }

    function resetContext() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawBall() {
        context.beginPath();
        context.arc(x, y, ballRadius, 0, Math.PI * 2);
        context.fillStyle = "#c90000";
        context.fill();
        context.closePath();
    }

    function drawPaddle() {
        context.beginPath();
        context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath();
    }

    function drawBricks() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {

                    let brickX = (c * (brickWidth + brickPadding)) + brickPadding / 2;
                    let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    context.beginPath();
                    context.rect(brickX, brickY, brickWidth, brickHeight);
                    var gradient = context.createLinearGradient(0, 0, canvas.width, r * brickHeight);

                    gradient.addColorStop(0, '#c90000');
                    gradient.addColorStop(1, '#000000');


                    context.fillStyle = gradient;
                    context.fill();
                    context.closePath();
                }

            }
        }
    }

    function drawScore() {
        context.font = "5rem 'Luckiest Guy', cursive"
        context.fillStyle = "#000000";
        context.textAlign = "center";
        context.fillText("Score: " + score, (canvas.width / 2), canvas.height / 2);
    }

    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if (x >= b.x && x <= b.x + brickWidth &&
                    y >= b.y && y <= b.y + brickHeight &&
                    b.status == 1) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                    }
                }
            }
        }
    }

    function calculatePosition() {
        if (x + dx >= canvas.width - ballRadius || x + dx <= ballRadius) {
            dx = -dx;
        }
        if (y + dy <= ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                //game over
                isGameOver = true;
            }
        }
    }

    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function gameOver(frame) {

        cancelAnimationFrame(frame);
        play();
    }

    draw();
}

play();
