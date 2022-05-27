export const statusInformations = {
  warmup: { icon: 'WarmupIcon', bottomText: 'WARMUP TIME' },
  rest: { icon: 'fa6-solid:clock', bottomText: 'REST TIME' },
  pause: { icon: 'fa6-solid:circle-pause', bottomText: 'SET PAUSED' },
  finish: { icon: 'bi:check-circle-fill', bottomText: 'TRAINING IS OVER!!!' }
} as {
  [key: string]: { icon: string; bottomText: string };
};
