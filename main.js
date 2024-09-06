const launchDate = new Date('Sept 7 2024 13:00').getTime();
const box = document.getElementById("box");
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const captionElement = document.getElementById('caption');
let myInterval;

// async function loadModule() {
//   try {
//     await import('/quiz.js');
//   } catch (error) {
//     console.error('Error loading the module:', error);
//   }
// }

function zeroPadding(time) {
  return time < 10 ? '0' + time : time;
}

function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function countdown() {
  const presentDate = new Date().getTime();
  const timeDifference = launchDate - presentDate;

  if (timeDifference > 0) {
    const diffInSeconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(diffInSeconds / 86400);
    const hours = Math.floor((diffInSeconds % 86400) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    daysElement.innerText = zeroPadding(days);
    hoursElement.innerText = zeroPadding(hours);
    minutesElement.innerText = zeroPadding(minutes);
    secondsElement.innerText = zeroPadding(seconds);
  } else {
    box.style.display = "none";
    clearInterval(myInterval);
    // loadModule();
  }
}

function removeListeners() {
  window.removeEventListener('resize', updateViewportHeight);
}

function init() {
  window.addEventListener('resize', updateViewportHeight);
  window.addEventListener('beforeunload', removeListeners);

  myInterval = setInterval(countdown, 1000);
  updateViewportHeight();
}

init();



