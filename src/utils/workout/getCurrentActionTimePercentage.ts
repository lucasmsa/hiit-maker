export const getCurrentActionTimePercentage = (
  actionTotalTime: number,
  currentActionRemainingTime: number
) => {
  return ((actionTotalTime - currentActionRemainingTime) * 100) / actionTotalTime || 0;
};
