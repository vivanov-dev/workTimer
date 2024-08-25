const launchDate = new Date('Sept 7 2024').getTime();
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const captionElement = document.getElementById('caption');

const countdown = function () {
  const presentDate = new Date().getTime();
  const timeDifference = launchDate - presentDate;

  if (timeDifference > 0) {
    const diffInSeconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(diffInSeconds / 86400);
    const hours = Math.floor((diffInSeconds % 86400) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    if (daysElement) daysElement.innerText = zeroPadding(days);
    if (hoursElement) hoursElement.innerText = zeroPadding(hours);
    if (minutesElement) minutesElement.innerText = zeroPadding(minutes);
    if (secondsElement) secondsElement.innerText = zeroPadding(seconds);
  } else {
    if (captionElement) captionElement.innerText = '🎉Congratulations!🎉';
  }
};

function zeroPadding(time) {
  return time < 10 ? '0' + time : time;
}

setInterval(countdown, 1000);

countdown();