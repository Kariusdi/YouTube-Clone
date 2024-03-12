const DIGIT_FORMATTER = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
});

export const formatDuration = (duration: number) => {
    const hours: number = Math.floor(duration / 60 / 60);
    const minutes: number = Math.floor((duration - hours * 60 ** 2) / 60);
    const seconds = duration % 60;

    if (hours > 0) {
        return `${hours}:${DIGIT_FORMATTER.format(minutes)}:${DIGIT_FORMATTER.format(seconds)}`;
    }

    return `${DIGIT_FORMATTER.format(minutes)}:${DIGIT_FORMATTER.format(seconds)}`;
}