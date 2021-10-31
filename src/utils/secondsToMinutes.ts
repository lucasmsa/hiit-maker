import moment from "moment";

const secondsToMinutes = (seconds: number): number => {
  const timeSpent = moment.duration(seconds, 'seconds');
  return timeSpent.minutes();
}

export default secondsToMinutes;