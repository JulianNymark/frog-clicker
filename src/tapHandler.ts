const THRESHOLD_MS = 250;

export const registerTapHandlers = (element: any, cb: (args: any) => any) => {
  element.addEventListener('touchstart', (startEvent: Event) => {
    const tapHandler = (endEvent: Event) => {
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
