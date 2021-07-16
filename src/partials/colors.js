const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

function onStartClick() {
  changeColor = setInterval(() => {
    return (body.style.backgroundColor = getRandomHexColor());
  }, 1000);

  startButton.setAttribute('disabled', 'true');
  return changeColor;
}

function onStopClick() {
  startButton.removeAttribute('disabled');
  clearInterval(changeColor);
}