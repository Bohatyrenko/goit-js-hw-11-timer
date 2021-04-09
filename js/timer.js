new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2019"),
});

getDays() {
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    return days
}
const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

const secs = Math.floor((time % (1000 * 60)) / 1000);
