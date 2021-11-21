import moment from "moment";

const secondsToMinutes = (seconds: number): number => {
  const minutesSpent = moment.duration(seconds, 'seconds').minutes();
  const hoursSpent = moment.duration(seconds, 'seconds').hours();
  return hoursSpent > 0 ? hoursSpent * 60 + minutesSpent : minutesSpent;
}

export default secondsToMinutes;