const constants = require('./../config/constants.json');
const moment = require('moment');

export function formatTimestamp(timestamp) {
  let result = moment.unix(timestamp);
  result.set({
    h: constants.globalTimestampHour,
    m: constants.globalTimestampMinutes,
    s: constants.globalTimestampSeconds
  });

  return result.unix();
}

export function formatStartDateTimestamp(timestamp) {
  let result = moment.unix(timestamp).utc();
  result.set({
    h: constants.globalStartDateTimestampHour,
    m: constants.globalStartDateTimestampMinutes,
    s: constants.globalStartDateTimestampSeconds
  });

  return result.unix();
}

export function formatEndDateTimestamp(timestamp) {
  let result = moment.unix(timestamp).utc();
  result.set({
    h: constants.globalEndDateTimestampHour,
    m: constants.globalEndDateTimestampMinutes,
    s: constants.globalEndDateTimestampSeconds
  });

  return result.unix();
}

export function addDaysToNow(days) {
  const date = new Date();
  date.setDate(date.getUTCDate() + days);
  return date;
}

export function formatTimestampToDays(timestamp) {
  const day = 24 * 60 * 60
  return (timestamp / day) | 0;
}
