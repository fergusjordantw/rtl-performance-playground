import { performance, PerformanceObserver } from "perf_hooks";

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry);
  });
});

perfObserver.observe({ entryTypes: ["measure"] });

export const conditionallyTimedOperation = async (
  shouldTrackTime: boolean,
  code: string,
  callback: () => unknown
) => {
  if (shouldTrackTime) {
    performance.mark(`${code}-start`);
  }

  const result = await callback();

  if (shouldTrackTime) {
    performance.mark(`${code}-end`);
    performance.measure(code, `${code}-start`, `${code}-end`);
  }

  return result;
};
