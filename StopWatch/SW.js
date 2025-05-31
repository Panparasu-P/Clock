const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const stopButton = document.getElementById('stop-button');
const lapButton = document.getElementById('lap-button');
const lapList = document.getElementById('lap-list');

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

function formateTime(milliseconds) {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMs = String(ms).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}:${formattedMs}`;
}

function updateDisplay() {
  const currentElapsedTime = isRunning ? elapsedTime + (Date.now() - startTime) : elapsedTime;
  timeDisplay.textContent = formateTime(currentElapsedTime);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    updateButtonState();
  }
}

function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime += Date.now() - elapsedTime;
    updateButtonState();
  }
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  lapCounter = 0;
  timeDisplay.textContent = '00:00:00';
  lapList.innerHTML = '';
  updateButtonState();
}

function lapTimer() {
  if (isRunning) {
    lapCounter++;
    const currentLapTime = elapsedTime + (Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<span class="lap-number">Lap${lapCounter}:</span><span class="lap-time">${formateTime(currentLapTime)}</span>`;
    lapList.prepend(lapItem);
  }
}

function updateButtonState() {
  if (isRunning) {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
  } else {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = (elapsedTime === 0 && lapCounter === 0);
    lapButton.disabled = true;
  }
}

startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
resetButton.addEventListener('click',resetTimer);
lapButton.addEventListener('click',lapTimer);

document.addEventListener('DOMContentLoaded',updateButtonState);

document.getElementById('clockButton').addEventListener('click',function(){
  window.location.href = '../index.html';
});

document.getElementById('dcButton').addEventListener('click',function(){
  window.location.href = '../DigitalClock/DC.html';
});

document.getElementById('timerButton').addEventListener('click',function(){
  window.location.href = '../CountdownTimer/timer.html';
});
