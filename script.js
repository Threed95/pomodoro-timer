let timerId;
let timeLeft = 25 * 60;
let timerOn = false;
let isBreak = true;

const pomodoroTimer = document.querySelector("#pomodoro-time");
const buttonStart = document.querySelector("#start");
const buttonReset = document.querySelector("#reset");
const buttonBreak = document.querySelector("#break");
const pomodoroButton = document.querySelector("#pomodoro");


function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const formatSeconds = timeLeft % 60;
    pomodoroTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(formatSeconds).padStart(2, '0')}`;
}


function startTimer() {
    timerOn = true;
    buttonStart.textContent = "stop";
    timerId = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
            const mode = isBreak ? "break" : "pomodoro";
            stopTimer(mode);
        }
    }, 10);
}

function startStopTime() {
    if (!timerOn) {
        startTimer();
        timerOn = true;
        buttonStart.textContent = "stop";
    } else {
        stopTimer();
    }
}

function stopTimer(mode) {
    switch (mode) {
        case "pomodoro":
            timeLeft = 25 * 60;
            break;
        case "break":
            timeLeft = 5 * 60;
            break;
    }
    updateTimer();
    clearInterval(timerId);
    timerOn = false;
    buttonStart.textContent = "start";
}



buttonStart.addEventListener("click", startStopTime);


buttonReset.addEventListener("click", () => {
    const mode = isBreak ? "break" : "pomodoro";
    stopTimer(mode);
})


buttonBreak.addEventListener("click", () => {
    stopTimer("break");
    pomodoroButton.classList.remove('active');
    buttonBreak.classList.add('active');
    isBreak = true;
})

pomodoroButton.addEventListener("click", () => {
    stopTimer("pomodoro");
    pomodoroButton.classList.add('active');
    buttonBreak.classList.remove('active');
    isBreak = false;
})