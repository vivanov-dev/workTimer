const launchDate = new Date('Sept 4 2024 23:00').getTime();
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const captionElement = document.getElementById('caption');

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

    requestAnimationFrame(countdown);
  } else {
    if (captionElement) captionElement.innerText = '🎉Congratulations!🎉';
  }
}

function removeListeners() {
  window.removeEventListener('resize', updateViewportHeight);
}

function init() {
  window.addEventListener('resize', updateViewportHeight);
  window.addEventListener('beforeunload', removeListeners);

  setInterval(countdown, 1000);
  updateViewportHeight();
}

init();



