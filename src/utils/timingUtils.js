/**
 * @description Debounce function.
 * Creates a debounced version of a function that will be called after a specified delay since the last invocation.
 * @param {Function} func The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {Function} A new debounced function.
 */
export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

/**
 * @description Throttle function.
 * Creates a throttled version of a function that will be executed at most once per a given time interval.
 * @param {Function} func The function to throttle.
 * @param {number} delay The delay in milliseconds.
 * @returns {Function} A new throttled function.
 */
export function throttle(func, delay) {
  let shouldWait = false;
  let lastArgs = null;
  let lastContext = null;

  return function (...args) {
    lastArgs = args;
    lastContext = this;

    if (shouldWait) {
      return;
    }

    func.apply(lastContext, lastArgs);

    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;

      // After the delay, if there were any calls made while waiting,
      // we can re-run the function with the last set of arguments.
      // This is an optional "trailing" throttle implementation.
      if (lastArgs) {
        func.apply(lastContext, lastArgs);
        lastArgs = null;
        lastContext = null;
      }
    }, delay);
  };
}
