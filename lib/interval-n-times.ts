export function runNTimes(callback: () => void, interval: number, n: number) {
    let count = 0;
    const intervalId = setInterval(() => {
        callback();
        count++;
        if (count === n) {
            clearInterval(intervalId);
        }
    }, interval);
}