const timerDisplay = document.getElementById('timerDisplay');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const messageBox = document.getElementById('messageBox');

let totalSeconds = 0;
let timerIntervalid;
let isPaused = false;

const audioContext = new (window.AudioContext)();
let oscillator = null;

const playBeep = () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
  }

  oscillator = audioContext.createOscillator();
  const gainNote = audioContext.createGain();

  oscillator.connect(gainNote);
  gainNote.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  gainNote.gain.setValueAtTime(1, audioContext.currentTime);

  oscillator.start(audioContext.currentTime);
  gainNote.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
  oscillator.stop(audioContext.currentTime + 1);
};

const displayMessage = (message, type = 'info') => {
  messageBox.textContent = message;
  messageBox.style.color = type === 'error' ? 'rgb(255,0,0)' : 'rgb(0, 255, 0)'

  if (type === 'info') {
    setTimeout(() => {
      messageBox.textContent = '';
    }, 3000);
  }
};

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (num) => num.toString().padStart(2, '0');

  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const updateDisplay = () => {
  timerDisplay.textContent = formatTime(totalSeconds);
}

const startTimer = () => {
  if (timerIntervalid) {
    displayMessage('Timer is already running.', 'info');
    return;
  }

  if (!isPaused) {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalSeconds <= 0) {
      displayMessage('Please set a timer greater then zero.', "error");
      return;
    }
  }
  isPaused = false;
  updateDisplay();

  timerIntervalid = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerIntervalid);
      timerIntervalid = null;
      gameActive = false;
      updateDisplay();
      displayMessage('Time\'s up!', 'info');
      playBeep();
      return;
    }
    totalSeconds--;
    updateDisplay();
  }, 1000);
  displayMessage('Timer Started!', 'info');
};

const pauseTimer = () => {
  if (timerIntervalid) {
    clearInterval(timerIntervalid);
    timerIntervalid = null;
    isPaused = true;
    displayMessage('Timer paused', 'info');
  } else {
    displayMessage('No timer is running to paused', 'error');
  }
}

const resetTimer = () => {
  clearInterval(timerIntervalid);
  timerIntervalid = null;
  totalSeconds = 0;
  isPaused = false;
  hoursInput.value = 0;
  minutesInput.value = 0;
  secondsInput.value = 0;
  updateDisplay();
  displayMessage('Timer reset', 'info');
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }
};

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

window.onload = updateDisplay;

document.getElementById('swButton').addEventListener('click',function(){
  window.location.href = '../StopWatch/SW.html';
});

document.getElementById('clockButton').addEventListener('click',function(){
  window.location.href = '../index.html';
});

document.getElementById('dcButton').addEventListener('click',function(){
  window.location.href = '../DigitalClock/DC.html';
});
