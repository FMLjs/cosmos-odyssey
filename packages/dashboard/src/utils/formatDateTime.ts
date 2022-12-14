import moment from 'moment';

export const formatDateTime = (str: Date, time = true) => {
    const dateTime = moment(str);

    return time ? dateTime.format("DD.MM.YYYY HH:mm:ss") : dateTime.format("DD.MM.YYYY")
}
