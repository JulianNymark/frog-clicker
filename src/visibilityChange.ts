import { calculateFPS, generateOfflineFrogs } from "./data";

export let hidden = "hidden";
let visibilityChange = "visibilitychange";

export const initVisibilityChange = () => {
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    //@ts-ignore
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    //@ts-ignore
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  const handleVisibilityChange = () => {
    if (!(document.visibilityState == 'hidden')) {
      generateOfflineFrogs();
    }
  };

  document.addEventListener(visibilityChange, handleVisibilityChange, false);
};
