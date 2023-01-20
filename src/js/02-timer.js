import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input');
const today = new Date();
const button = document.querySelector('button');

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

button.disabled = true;

const convertMs = ms => {
  const addLeadingZero = value => {
    return String(value).padStart(2, '0');
  };
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates.forEach(element => {
      intervalId: null;
      isActive: false;

      if (element <= today) {
        Notiflix.Notify.warning('Please choose a date in the future ❗');
        return;
      }

      if (element > today) {
        Notiflix.Notify.success('Date selected correctly ✅');
        button.addEventListener('click', countdown);

        button.disabled = false;
      }
    });

    console.log(selectedDates[0]);

    function countdown() {
      if (this.isActive === true) {
        return;
      }

      this.isActive = true;

      this.intervalId = setInterval(() => {
        const now = new Date().getTime();
        const unixSelectedDate =
          flatpickr.formatDate(selectedDates[0], 'U') * 1000;
        const timeLeft = unixSelectedDate - now;
        const timeLeftMS = convertMs(timeLeft);

        refs.days.textContent = timeLeftMS.days;
        refs.hours.textContent = timeLeftMS.hours;
        refs.minutes.textContent = timeLeftMS.minutes;
        refs.seconds.textContent = timeLeftMS.seconds;

        const stopTimer = () => {
          clearInterval(this.intervalId);

          refs.days.textContent = '00';
          refs.hours.textContent = '00';
          refs.minutes.textContent = '00';
          refs.seconds.textContent = '00';
        };

        if (timeLeft <= 0) {
          stopTimer();
          Notiflix.Report.info('Hey ✋', 'Time is up!', 'OK');
          this.isActive = false;
        }

        console.log(timeLeftMS);
      }, 1000);
    }
  },
};

flatpickr(input, options);
