const rabbit = document.getElementById("rabbit");
const maze = document.querySelector(".maze");
const walls = document.querySelectorAll(".wall");
const home = document.getElementById("home");

const attemptsElement =
document.getElementById("attempts");

const timerElement =
document.getElementById("timer");

const statusElement =
document.getElementById("status");

const nextButton =
document.getElementById("nextButton");

let attempts = 0;

let gameCompleted = false;

let gameStarted = false;

let startTime = Date.now();

let loadingProgress = 0;

let loadingTimer = null;

const startPosition = {
x: 5,
y: 5
};

/* ==========================================
CREATE LOADING PANEL
========================================== */

function createLoadingPanel() {

const panel =
    document.createElement("div");

panel.id = "loadingPanel";

panel.className = "loading-panel";

panel.innerHTML = `

    <div class="loading-top">

        <span id="loadingText">
            LOADING ROUTE
        </span>

        <span id="loadingPercent">
            0%
        </span>

    </div>

    <div class="loading-bar">

        <div
            id="loadingProgress"
            class="loading-progress">
        </div>

    </div>

`;

document.body.appendChild(panel);

}

createLoadingPanel();

const loadingPanel =
document.getElementById("loadingPanel");

const loadingProgressBar =
document.getElementById("loadingProgress");

const loadingPercent =
document.getElementById("loadingPercent");

const loadingText =
document.getElementById("loadingText");

/* ==========================================
CREATE FIRST QUESTION
========================================== */

function createLoadQuestion() {

const question =
    document.createElement("div");

question.id = "loadQuestion";

question.innerHTML = `

    <div class="load-question-box">

        <div class="load-question-small">
            MISSION COMPLETE
        </div>

        <div class="load-question-title">
            DO YOU WANT TO LOAD THIS PAGE?
        </div>

        <div class="load-question-text">
            YES will restart the maze.
            NO will reveal the next step.
        </div>

        <div class="load-question-buttons">

            <button id="yesLoadButton">
                YES
            </button>

            <button id="noLoadButton">
                NO
            </button>

        </div>

    </div>

`;

document.body.appendChild(question);


document
    .getElementById("yesLoadButton")
    .addEventListener(
        "click",
        restartGame
    );


document
    .getElementById("noLoadButton")
    .addEventListener(
        "click",
        continueGame
    );

}

createLoadQuestion();

const loadQuestion =
document.getElementById("loadQuestion");

/* ==========================================
CREATE SECOND QUESTION
========================================== */

function createContinueQuestion() {

const question =
    document.createElement("div");

question.id =
    "continueQuestion";

question.innerHTML = `

    <div class="load-question-box">

        <div class="load-question-small">
            FINAL CONFIRMATION
        </div>

        <div class="load-question-title">
            ARE YOU SURE YOU WANT TO CONTINUE?
        </div>

        <div class="load-question-text">
            YES will take you to registration.
            NO will return you to the maze.
        </div>

        <div class="load-question-buttons">

            <button id="yesContinueButton">
                YES
            </button>

            <button id="noContinueButton">
                NO
            </button>

        </div>

    </div>

`;

document.body.appendChild(question);


document
    .getElementById("yesContinueButton")
    .addEventListener(
        "click",
        goToRegister
    );


document
    .getElementById("noContinueButton")
    .addEventListener(
        "click",
        returnToGame
    );

}

createContinueQuestion();

const continueQuestion =
document.getElementById(
"continueQuestion"
);

/* ==========================================
TIMER
========================================== */

function updateTimer() {

if (gameCompleted) {
    return;
}

const elapsed =
    Math.floor(
        (Date.now() - startTime) / 1000
    );

const minutes =
    Math.floor(elapsed / 60);

const seconds =
    elapsed % 60;


timerElement.textContent =
    String(minutes).padStart(2, "0")
    +
    ":"
    +
    String(seconds).padStart(2, "0");

}

setInterval(updateTimer, 1000);

/* ==========================================
LOADING
========================================== */

function startLoading() {

loadingPanel.classList.add("active");

loadingProgress = 0;

loadingProgressBar.style.width =
    "0%";

loadingPercent.textContent =
    "0%";

loadingText.textContent =
    "LOADING ROUTE";


clearInterval(loadingTimer);


loadingTimer = setInterval(
    function() {

        loadingProgress +=
            Math.random() * 7;


        if (loadingProgress >= 100) {

            loadingProgress = 100;

            clearInterval(
                loadingTimer
            );

            loadingText.textContent =
                "ROUTE ACTIVE";
        }


        loadingProgressBar.style.width =
            loadingProgress + "%";


        loadingPercent.textContent =
            Math.floor(
                loadingProgress
            ) + "%";

    },
    80
);

}

/* ==========================================
RESET RABBIT
========================================== */

function resetRabbit() {

rabbit.style.left =
    startPosition.x + "%";

rabbit.style.top =
    startPosition.y + "%";


attempts++;

attemptsElement.textContent =
    attempts;


statusElement.textContent =
    "WALL HIT — TRY AGAIN";


loadingText.textContent =
    "ROUTE FAILED";


setTimeout(
    function() {

        if (!gameCompleted) {

            statusElement.textContent =
                "FIND THE WAY HOME";

            startLoading();
        }

    },
    500
);

}

/* ==========================================
COLLISION
========================================== */

function rectanglesOverlap(a, b) {

return !(
    a.right < b.left ||
    a.left > b.right ||
    a.bottom < b.top ||
    a.top > b.bottom
);

}

/* ==========================================
WALL COLLISION
========================================== */

function checkWallCollision() {

const rabbitRect =
    rabbit.getBoundingClientRect();


for (const wall of walls) {

    const wallRect =
        wall.getBoundingClientRect();


    if (
        rectanglesOverlap(
            rabbitRect,
            wallRect
        )
    ) {

        resetRabbit();

        return true;
    }
}


return false;

}

/* ==========================================
HOME COLLISION
========================================== */

function checkHomeCollision() {

const rabbitRect =
    rabbit.getBoundingClientRect();

const homeRect =
    home.getBoundingClientRect();


if (
    rectanglesOverlap(
        rabbitRect,
        homeRect
    )
) {

    finishGame();
}

}

/* ==========================================
FINISH GAME
========================================== */

function finishGame() {

if (gameCompleted) {
    return;
}


gameCompleted = true;


clearInterval(loadingTimer);


loadingProgressBar.style.width =
    "100%";

loadingPercent.textContent =
    "100%";

loadingText.textContent =
    "ROUTE COMPLETE";


loadingPanel.classList.remove(
    "active"
);


statusElement.textContent =
    "MISSION COMPLETE";


setTimeout(
    function() {

        loadQuestion.style.display =
            "flex";

    },
    300
);

}

/* ==========================================
YES — RESTART
========================================== */

function restartGame() {

loadQuestion.style.display =
    "none";

continueQuestion.style.display =
    "none";

nextButton.style.display =
    "none";


gameCompleted = false;

gameStarted = false;


attempts = 0;

attemptsElement.textContent =
    "0";


startTime = Date.now();


rabbit.style.left =
    startPosition.x + "%";

rabbit.style.top =
    startPosition.y + "%";


statusElement.textContent =
    "FIND THE WAY HOME";


loadingProgress = 0;

loadingProgressBar.style.width =
    "0%";

loadingPercent.textContent =
    "0%";

loadingText.textContent =
    "LOADING ROUTE";


startLoading();

}

/* ==========================================
FIRST QUESTION — NO
========================================== */

function continueGame() {

loadQuestion.style.display =
    "none";


nextButton.style.display =
    "block";


statusElement.textContent =
    "READY TO CONTINUE";

}

/* ==========================================
CONTINUE BUTTON
========================================== */

nextButton.addEventListener(
"click",
function() {

    nextButton.style.display =
        "none";


    continueQuestion.style.display =
        "flex";

}

);

/* ==========================================
SECOND QUESTION — YES
========================================== */

function goToRegister() {

continueQuestion.style.display =
    "none";


window.location.href =
    "register.html";

}

/* ==========================================
SECOND QUESTION — NO
========================================== */

function returnToGame() {

continueQuestion.style.display =
    "none";


gameCompleted = false;

gameStarted = false;


rabbit.style.left =
    startPosition.x + "%";

rabbit.style.top =
    startPosition.y + "%";


startTime = Date.now();


statusElement.textContent =
    "FIND THE WAY HOME";


startLoading();

}

/* ==========================================
MOUSE CONTROL
========================================== */

document.addEventListener(
"mousemove",
function(event) {

    if (gameCompleted) {
        return;
    }


    const mazeRect =
        maze.getBoundingClientRect();


    const rabbitWidth =
        rabbit.offsetWidth;

    const rabbitHeight =
        rabbit.offsetHeight;


    let mouseX =
        event.clientX
        -
        mazeRect.left
        -
        rabbitWidth / 2;


    let mouseY =
        event.clientY
        -
        mazeRect.top
        -
        rabbitHeight / 2;


    const minX = 5;

    const minY = 5;


    const maxX =
        mazeRect.width
        -
        rabbitWidth
        -
        5;


    const maxY =
        mazeRect.height
        -
        rabbitHeight
        -
        5;


    mouseX =
        Math.max(
            minX,
            Math.min(
                mouseX,
                maxX
            )
        );


    mouseY =
        Math.max(
            minY,
            Math.min(
                mouseY,
                maxY
            )
        );


    const percentX =
        (mouseX / mazeRect.width)
        * 100;


    const percentY =
        (mouseY / mazeRect.height)
        * 100;


    rabbit.style.left =
        percentX + "%";


    rabbit.style.top =
        percentY + "%";


    gameStarted = true;


    if (
        !loadingPanel.classList.contains(
            "active"
        )
    ) {

        startLoading();
    }


    if (checkWallCollision()) {
        return;
    }


    checkHomeCollision();

}

);

/* ==========================================
MOUSE LEAVE
========================================== */

document.addEventListener(
"mouseleave",
function() {

    if (
        !gameCompleted &&
        gameStarted
    ) {

        resetRabbit();
    }

}

);

/* ==========================================
INITIAL POSITION
========================================== */

rabbit.style.left =
startPosition.x + "%";

rabbit.style.top =
startPosition.y + "%";

startLoading();