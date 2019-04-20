function play() {
    let score = 0;

    let canvas = document.getElementById("game");
    let context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let x = canvas.width / 2;
    let y = canvas.height / 2;

    let ballRadius = 20;
    let ballDiameter = 2 * ballRadius;
    let ballY = (canvas.height - ballRadius) / 2;
    let ballSpeed = canvas.height / 50;

    let isUpPressed = false;
    let isDownPressed = false;

    let bricks = [];

    let brickRowCount = 5;
    let brickColumnCount = 10;
    let brickWidth = canvas.width / brickColumnCount;
    let brickHeight = canvas.height / brickRowCount;
    let dxBrick = 0;
    let brickSpeed = canvas.height /100;

    let isGameOver = false;

    InitializeBricks();

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {

        if (e.key == "w" || e.key == "ArrowUp") {
            isUpPressed = true;
        }
        else if (e.key == "s" || e.key == "ArrowDown") {
            isDownPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "w" || e.key == "ArrowUp") {
            isUpPressed = false;
        }
        else if (e.key == "s" || e.key == "ArrowDown") {
            isDownPressed = false;
        }
    }

    function InitializeBricks() {

        let visibleCounter = 0;

        for (var r = 0; r < brickRowCount; r++) {

            bricks[r] = { x: 0, y: 0 };

            let rnd = Math.random();

            if(rnd > 0.5){
                bricks[r].status = 1;
                visibleCounter++;
                if(visibleCounter == brickRowCount){
                    //ако е full
                    InitializeBricks();
                }
            }
            else{
                bricks[r].status = 0;
            }

        }

        if(visibleCounter == 0){
            //ако е empty
            InitializeBricks();
        }

    }

    function draw() {

        resetContext();
        drawBricks();
        drawBall();
        drawScore();
        collisionDetection();

        if (isDownPressed && ballY < canvas.height - ballDiameter) {
            ballY += ballSpeed;
        }
        else if (isUpPressed && ballY - ballRadius > 0) {
            ballY -= ballSpeed;
        }


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
        context.arc(x, ballY, ballRadius, 0, Math.PI * 2);
        context.fillStyle = "#c90000";
        context.fill();
        context.closePath();
    }

    function drawBricks() {

        let c = brickColumnCount - 1;

        for (let r = 0; r < brickRowCount; r++) {

            let currentBrick = bricks[r];

            if (c == brickColumnCount - 1) {

                let brickX = c * brickWidth - dxBrick;
                let brickY = r * brickHeight;


                if (brickX < -x / 2) {
                    dxBrick = -x / 2;
                    score++;
                    ballSpeed++;
                    brickSpeed++;

                    InitializeBricks();

                }

                if (currentBrick.status == 1) {
                    currentBrick.x = brickX;
                    currentBrick.y = brickY;
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


        dxBrick += brickSpeed;
    }

    function drawScore() {
        context.font = "5rem 'Luckiest Guy', cursive"
        context.fillStyle = "#000000";
        context.fillText("Score: " + score, 0, y * 2);
    }

    function collisionDetection() {
        
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[r];
                if (x >= b.x && x <= b.x + brickWidth &&
                    ballY >= b.y && ballY <= b.y + brickHeight &&
                    b.status == 1) {

                    isGameOver = true;

                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                    }
                }
            }
        
    }
    function gameOver(frame) {

        cancelAnimationFrame(frame);
        play();
    }

    draw();
}

play();