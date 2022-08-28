import Notiflix from "notiflix";

const refs = {
delay: document.querySelector('input[name="delay"]'),
step: document.querySelector('input[name="step"]'),
amount: document.querySelector('input[name="amount"]'),
btnCreatePromise: document.querySelector('button[type="submit"]')
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.btnCreatePromise.addEventListener('click', onBtnCreatePromiseClick)

function onBtnCreatePromiseClick(e) {
  e.preventDefault()
  let firstDelay = Number(refs.delay.value);
  let delayStep = Number(refs.step.value);
  for (let i = 0; i < refs.amount.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

