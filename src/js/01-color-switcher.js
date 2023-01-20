const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let idInterval = null;

const onChangeColor = e => {
  onBtnDisabled();
  idInterval = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = `${color}`;
  }, 1000);
};

const onStopChangeColor = event => {
  clearInterval(idInterval);
  onBtnDisabled();
};

function onBtnDisabled() {
  if (!btnStart.disabled) {
    btnStart.disabled = true;
    btnStop.disabled = false;
  } else {
    btnStart.disabled = false;
    btnStop.disabled = true;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', onChangeColor);
btnStop.addEventListener('click', onStopChangeColor);