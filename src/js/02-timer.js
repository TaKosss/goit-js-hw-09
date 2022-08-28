import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
    timerH: document.querySelector('.timer'),
    text: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    d: document.querySelector('[data-days]'),
    h: document.querySelector('[data-hours]'),
    m: document.querySelector('[data-minutes]'),
    s: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
   onClose(selectedDates) {
       if (selectedDates[0] < new Date()) {
           Notiflix.Notify.failure('Please choose a date in the future')
           refs.startBtn.disabled = true
       } else {
           refs.startBtn.disabled = false
    };
  },
};

flatpickr(refs.text, options);

refs.startBtn.addEventListener('click', onStartBtnClick)

function onStartBtnClick() {
let timer = setInterval(() => {
    refs.startBtn.disabled = true
    const countdown = new Date(refs.text.value) - new Date()
    if (countdown >= 0) {
    let timeComponents = convertMs(countdown)
      refs.d.textContent = addLeadingZero(timeComponents.days);
      refs.h.textContent = addLeadingZero(timeComponents.hours);
      refs.m.textContent = addLeadingZero(timeComponents.minutes);
      refs.s.textContent = addLeadingZero(timeComponents.seconds);
    } else {
        Notiflix.Notify.success('Countdown finished');
        clearInterval(timer)
    }
  }, 1000)
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
