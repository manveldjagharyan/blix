window.onload = function () {



    //......CANVAS......//
    let homepage = document.getElementById('homepage');
    let gamepage = document.getElementById('gamepage');
    let shoppage = document.getElementById('shoppage');
    let howpage = document.getElementById('howpage');
    let settingspage = document.getElementById('settingspage');
    let spinner = document.querySelector('.spinner');
    let bombBackground = document.getElementById('bombBackground');
    gamepage.style.display = 'none';
    howpage.style.display = 'none';
    settingspage.style.display = 'none';



    //......BUTTONS......//
    let startButton = document.getElementById('startButton');
    let shopButton = document.getElementById('shopButton');
    let howButton = document.getElementById('howButton');
    let settingsButton = document.getElementById('settingsButton');
    ////
    let leftGamepage = document.getElementById('leftGamepage');
    let leftShoppage = document.getElementById('leftShoppage');
    let leftHowpage = document.getElementById('leftHowpage');
    let leftSettingspage = document.getElementById('leftSettingspage');


    //......START......//
    let countdownIntervalId;
    let ballIntervalId;
    let bombIntervalId;
    let ballUltraIntervalId;
    let scoreValue = 0;
    let scoreDisplay = document.getElementById("score");

    startButton.addEventListener('click', function () {
        clearInterval(countdownIntervalId);
        clearInterval(ballIntervalId);
        clearInterval(bombIntervalId);
        clearInterval(ballUltraIntervalId);
        clearGameArea();

        scoreValue = 0;
        scoreDisplay.textContent = `Score: ${scoreValue}`;

        homepage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500);

        setTimeout(() => {
            gamepage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            gamepage.style.display = 'flex';

            let timeStart = document.getElementById('timerStart');
            timeStart.style.display = 'flex';
            timeStart.style.animation = '';
            timeStart.textContent = '4';

            let timerStart = 4;
            countBall = 0;
            countBombs = 0;

            countdownIntervalId = setInterval(() => {
                if (timerStart > 1) {
                    timerStart--;
                    timeStart.textContent = timerStart;
                } else {
                    clearInterval(countdownIntervalId);
                    timeStart.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
                    setTimeout(() => {
                        timeStart.style.display = 'none';
                    }, 1000);

                    ballIntervalId = setInterval(() => {
                        if (countBall < maxBalls) {
                            createBall();
                        } else {
                            clearInterval(ballIntervalId);
                        }
                    }, 500);

                    bombIntervalId = setInterval(() => {
                        if (countBombs < maxBombs) {
                            createBomb();
                        } else {
                            clearInterval(bombIntervalId);
                        }
                    }, 4000);

                    ballUltraIntervalId = setInterval(() => {
                        if (countBombs < maxBombs) {
                            createBallUltra();
                        } else {
                            clearInterval(ballUltraIntervalId);
                        }
                    }, 2000);
                }
            }, 1000);
        }, 500);
    });


    /////////////////////////////////////////////////////////////////////////////////


    const gameArea = document.getElementById("gameArea");
    let countBall = 0;
    let countBombs = 0;
    let countBallUltra = 0;
    const maxBalls = 50;
    const maxBombs = 1;
    const maxBallsUltra = 1;



    function createBall() {
        let ball = document.createElement("div");
        ball.className = "ball";

        let size = 50
        ball.style.width = ball.style.height = size + "px";

        const left = Math.random() * (window.innerWidth - size);
        ball.style.left = `${left}px`;

        const duration = Math.random() * 2 + 5;
        ball.style.animationDuration = `${duration}s`;

        gameArea.appendChild(ball);

        setTimeout(() => {
            gameArea.removeChild(ball);
        }, duration * 1000);

        countBall++;

        if (countBall >= maxBalls) {
            countBall = 0;
        }

        ball.addEventListener("click", function () {
            scoreValue += 1;
            ball.style.filter = "blur(100px)";
            setTimeout(() => {
                gameArea.removeChild(ball);
            }, 500);
            countBall--;
            scoreDisplay.textContent = `Score: ${scoreValue}`;
        });
    }

    function createBallUltra() {
        let ballUltra = document.createElement("div");
        ballUltra.className = "ballUltra";

        let size = 60
        ballUltra.style.width = ballUltra.style.height = size + "px";

        const left = Math.random() * (window.innerWidth - size);
        ballUltra.style.left = `${left}px`;

        const duration = Math.random() * 2 + 5;
        ballUltra.style.animationDuration = `${duration}s`;

        gameArea.appendChild(ballUltra);

        setTimeout(() => {
            gameArea.removeChild(ballUltra);
        }, duration * 1000);

        countBallUltra++;

        if (countBallUltra >= maxBallsUltra) {
            countBallUltra = 0;
        }

        ballUltra.addEventListener("click", function () {
            scoreValue += 5;
            ballUltra.style.filter = "blur(100px)";
            setTimeout(() => {
                gameArea.removeChild(ballUltra);
            }, 500);
            countBallUltra--;
            scoreDisplay.textContent = `Score: ${scoreValue}`;
        });
    }

    function createBomb() {
        let bomb = document.createElement("div");
        // bomb.innerHTML = `<i class="fa-solid fa-bomb"></i>`
        bomb.className = "bomb";

        let size = 50
        bomb.style.width = bomb.style.height = size + "px";

        const left = Math.random() * (window.innerWidth - size);
        bomb.style.left = `${left}px`;

        const duration = Math.random() * 2 + 5;
        bomb.style.animationDuration = `${duration}s`;

        gameArea.appendChild(bomb);

        setTimeout(() => {
            gameArea.removeChild(bomb);
        }, duration * 1000);

        countBombs++;

        if (countBombs >= maxBombs) {
            countBombs = 0;
        }

        bomb.addEventListener("click", function handleBombClick() {
            if (scoreValue > 0 && scoreValue < 20) {
                scoreValue -= 5;
            } else if (scoreValue > 20 && scoreValue < 50) {
                scoreValue -= 15;
            } else if (scoreValue > 50 && scoreValue < 100) {
                scoreValue -= 40;
            } else if (scoreValue < 100) {
                scoreValue -= 60;
            } if (scoreValue === 0 || scoreValue < 0) {
                scoreValue = 0;
            }

                bombBackground.style.display = 'flex';
            bombBackground.style.animation = 'bombLight 1s ease-in-out forwards';

            setTimeout(() => {
                bombBackground.style.display = 'none';
            }, 1000);
            bomb.style.pointerEvents = "none";
            bomb.style.filter = "blur(100px)";
            setTimeout(() => {
                if (gameArea.contains(bomb)) {
                    gameArea.removeChild(bomb);
                }
            }, 500);
            countBombs--
            scoreDisplay.textContent = `Score: ${scoreValue}`;
        });

    }

    ////////...............................ARXIV.......................................////////////

    function loading(time) {
        spinner.style.display = 'flex';
        spinner.style.animation = 'loading 2s linear forwards';
        setTimeout(() => {
            spinner.style.display = 'none';
        }, time);
    }

    function clearGameArea() {
        document.querySelectorAll('.ball, .bomb, .ballUltra').forEach(el => el.remove());
        countBall = 0;
        countBombs = 0;
    }


    howButton.addEventListener('click', function () {
        homepage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500)
        setTimeout(() => {
            howpage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            howpage.style.display = 'flex';
        }, 500);
    });

    settingsButton.addEventListener('click', function () {
        homepage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500)
        setTimeout(() => {
            settingspage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            settingspage.style.display = 'flex';
        }, 500);
    });

    shopButton.addEventListener('click', function () {
        homepage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500)
        setTimeout(() => {
            shoppage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            shoppage.style.display = 'flex';
        }, 500);
    });


    leftGamepage.addEventListener('click', function () {
        gamepage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500)
        setTimeout(() => {
            homepage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            homepage.style.display = 'flex';
        }, 1200);
    });

    leftShoppage.addEventListener('click', function () {
        shoppage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500)
        setTimeout(() => {
            homepage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            homepage.style.display = 'flex';
        }, 1200);
    });

    leftHowpage.addEventListener('click', function () {
        howpage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500)
        setTimeout(() => {
            homepage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            homepage.style.display = 'flex';
        }, 1200);
    });

    leftSettingspage.addEventListener('click', function () {
        settingspage.style.animation = 'backgroundFadeOut 1s ease-in-out forwards';
        loading(500)
        setTimeout(() => {
            homepage.style.animation = 'backgroundFadeIn 1s ease-in-out forwards';
            homepage.style.display = 'flex';
        }, 1200);
    });
}
