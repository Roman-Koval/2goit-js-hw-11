import Swal from 'sweetalert2/dist/sweetalert2.js';
const inputDate = document.querySelector('#date-selector');
const startTimerButton = document.querySelector('button[data-start-timer]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let tik = null;
let finalDate = null;
let timerTime = null;

function pad(value) {
  return String(value).padStart(2, '0');
}

const timer = () => {
  const currentDate = Date.parse(new Date());
  finalDate = Date.parse(inputDate.value) + inputDate.valueAsDate.getTimezoneOffset() * 60 * 1000;
  timerTime = finalDate - currentDate;
  let getTime = convertMs(timerTime);

  timerDays.innerHTML = pad(getTime.days);
  timerHours.innerHTML = pad(getTime.hours);
  timerMinutes.innerHTML = pad(getTime.minutes);
  timerSeconds.innerHTML = pad(getTime.seconds);
};

const startTimer = () => {
  clearInterval(tik);

  if (Date.parse(inputDate.value) - Date.parse(new Date())) {
    tik = setInterval(timer, 1000);
  }
};

startTimerButton.addEventListener('click', startTimer);

const selectInputDate = () => {
  clearInterval(tik);

  if (Date.parse(inputDate.value) < Date.parse(new Date())) {
    startTimerButton.setAttribute('disabled', 'true');
    Swal.fire({
      title: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'Oke!!',
    });
  } else if (Date.parse(inputDate.value) >= Date.parse(new Date())) {
    startTimerButton.removeAttribute('disabled');
    timer();
  }

  return;
};

inputDate.addEventListener('change', selectInputDate);