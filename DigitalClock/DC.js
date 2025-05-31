const timeDisplay = document.getElementById('timeDisplay');
const ampmDisplay = document.getElementById('ampmDisplay');
const dateDisplay = document.getElementById('dateDisplay');

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;

  const option = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  };
  const formattedDate = now.toLocaleDateString(undefined,option);
  
  timeDisplay.textContent = formattedTime;
  ampmDisplay.textContent = ampm;
  dateDisplay.textContent = formattedDate;
}

updateClock();

setInterval(updateClock,1000);


document.getElementById('timerButton').addEventListener('click',function(){
  window.location.href = '../CountdownTimer/timer.html';
});

document.getElementById('swButton').addEventListener('click',function(){
  window.location.href = '../StopWatch/SW.html';
});

document.getElementById('clockButton').addEventListener('click',function(){
  window.location.href = '../index.html';
});