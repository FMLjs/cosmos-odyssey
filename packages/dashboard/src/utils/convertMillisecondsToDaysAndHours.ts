export const convertMillisecondsToDaysAndHours = (value: number | string) => {
    const totalSecond = Math.floor(Number(value) / 1000);
    const totalMinutes = Math.floor(totalSecond / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    return {days, hours};
}