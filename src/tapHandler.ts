const THRESHOLD_MS = 250;

export const registerTapHandlers = (element, cb) => {
  element.addEventListener('touchstart', startEvent => {
    const tapHandler = endEvent => {
      if (startEvent.target === endEvent.target) {
        cb.call(startEvent.target, startEvent);
      }
    }

    element.addEventListener('touchend', tapHandler);

    window.setTimeout(() => {
      element.removeEventListener('touchend', tapHandler);
    }, THRESHOLD_MS);
  })

  return this
}