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

    if (timeLeft === 0) {
        clearInterval(timerId);
        timerOn = false;
        switchTime();
    } else {
        timeLeft--;
    }
}


function startTimer() {
    timerOn = true;
    buttonStart.textContent = "stop";
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
            resetTime();
        }
        if (isBreak) {
            timeLeft = 5 * 60;
            isBreak = false;
        } else {
            timeLeft = 25 * 60;
            isBreak = true;
        }
        updateDisplay();
        if (timerOn) {
            startTimer();
        }
    }, 100);
}

function startStopTime() {
    if (!timerOn) {
        timerId = setInterval(updateTimer, 100);
        timerOn = true;
        buttonStart.textContent = "stop";
    } else {
        clearInterval(timerId);
        timerOn = false;
        buttonStart.textContent = "start";
    }
}


function resetTime() {
    clearInterval(timerId);
    timerOn = false;
    buttonStart.textContent = "start";
    timeLeft = isBreak ? 25 * 60 : 5 * 60;
    updateTimer()
}

function switchTime() {
    isBreak = !isBreak;
    timeLeft = isBreak ? 25 * 60 : 5 * 60;
    updateTimer()
}


buttonStart.addEventListener("click", startStopTime);


buttonReset.addEventListener("click", () => {
    resetTime();
    updateTimer();

})

buttonBreak.addEventListener("click", () => {
    switchTime()
    pomodoroButton.classList.remove('active');
    buttonBreak.classList.add('active');
    updateTimer();
})

updateTimer();