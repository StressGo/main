
const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

const showTime = (seconds) => {
    let hours = 0;
    let minutes = 0;

    if (seconds < 0) {
        seconds = 0;
    }

    if (seconds < 60) {
        return `00:00:${padToTwo(seconds)}`;
    }

    let remainingSeconds = seconds % 60;
    minutes = (seconds - remainingSeconds) / 60;

    if (minutes < 60) {
        return `00:${padToTwo(minutes)}:${padToTwo(remainingSeconds)}`;
    }

    let remainingMinutes = minutes % 60;
    hours = (minutes - remainingMinutes) / 60;

    return `${padToTwo(hours)}:${padToTwo(remainingMinutes)}:${padToTwo(remainingSeconds)}`;
}

export default showTime;