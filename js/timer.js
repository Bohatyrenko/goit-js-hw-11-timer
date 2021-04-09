const refs = {
  startBtn: document.querySelector("button[data-action-start"),
  stoptBtn: document.querySelector("button[data-action-stop"),
  clockface: document.querySelector(".clockface"),
};

class CountdownTimer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = Date.now();

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const countdownTimer = new CountdownTimer({
  onTick: updateClockface,
  //   selector: "#timer-1",
  //   targetDate: new Date("Jul 17, 2019"),
});

refs.startBtn.addEventListener("click", () => {
  countdownTimer.start();
});

refs.stoptBtn.addEventListener("click", () => {
  countdownTimer.stop();
});

//У нас есть метод .start и .stop, где при записи ниже в даних методах .this будет ссылаться на startBtn и stoptBtn.
//Если передавать метод объекта как коллбек-функцию, он будет скорее всего undefinde, но если передать его в addEventListener то this в других методах объектов будет ссылаться на DOM-элемент, на котором висит слушатель события, поэтому не забываем привязывать контекст .bind(CountdownTimer).
// чтоб this ссылался на объект countdownTimer
//refs.startBtn.addEventListener("click", countdownTimer.start.bind(CountdownTimer));

function updateClockface({ hours, mins, secs }) {
  refs.clockface.textContent = `${hours}:${mins}:${secs}`;
}
