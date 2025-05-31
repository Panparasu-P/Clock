const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondDegrees = (seconds * 6);

  const minutes = now.getMinutes();
  const minuteDegrees = (minutes * 6) + (seconds * 0.1);

  const hours = now.getHours() % 12;
  const hourDegrees = (hours * 30) + (minutes * 0.5) + (seconds * (0.5 / 60));

  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDegrees}deg)`;
  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDegrees}deg)`;
}
updateClock();

setInterval(updateClock, 1000);

window.onload = function(){
  updateClock();
};

document.getElementById('dcButton').addEventListener('click',function(){
  window.location.href = './DigitalClock/DC.html';
});

document.getElementById('timerButton').addEventListener('click',function(){
  window.location.href = './CountdownTimer/timer.html';
});

document.getElementById('swButton').addEventListener('click',function(){
  window.location.href = './StopWatch/SW.html';
});