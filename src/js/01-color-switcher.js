const body = document.querySelector('body')
const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick)
stopBtn.addEventListener('click', onStopBtnClick)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick(e) {
    e.preventDefault()
    startBtn.disabled = true
    stopBtn.disabled = false
    timerId = setInterval(() => {
        const randomBackgroundColor = getRandomHexColor()
        body.style.backgroundColor = randomBackgroundColor
    }, 1000)
}

function onStopBtnClick(e) {
    startBtn.disabled = false
    stopBtn.disabled = true
    clearInterval(timerId);
}


