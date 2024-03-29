import { data } from "./data";
import { Construct, constructs } from "./constructs";
import { registerTapHandlers } from "./tapHandler";

const VERSION = "1.1.2";

type Version = {
  major: number;
  minor: number;
  patch: number;
};

const parseVersion = (version: string): Version => {
  const strings = version.split(".");
  return {
    major: parseInt(strings[0]),
    minor: parseInt(strings[1]),
    patch: parseInt(strings[2]),
  };
};

const vLessThan = (a: string, b: string) => {
  return versionLessThan(parseVersion(a), parseVersion(b));
};

const versionLessThan = (a: Version, b: Version) => {
  return (a.major < b.major || a.minor < b.minor || a.patch < b.patch);
};

export const applyPatches = () => {
  let version = localStorage.getItem("version");
  if (!version) {
    version = VERSION;
    localStorage.setItem("version", VERSION);
  }
  const patchMessages: string[] = [];

  patchConstructs(version, patchMessages);
  patchGeneric(version, patchMessages);
  showPatchMessages(patchMessages);
  setVersion(VERSION);
};

const setVersion = (version: string) => {
  const element = document.getElementById("version");
  element!.innerHTML = `v${version}`;
  localStorage.setItem("version", version);
};

const patchConstructs = (version: string, patchMessages: string[]) => {
  if (vLessThan(version, "0.0.1")) {
    for (const construct of data.constructs) {
      if (construct.id === "ocean" && construct.frogPerSec !== 500) {
        construct.frogPerSec = 500;
        patchMessages.push("ocean has been buffed");
      }
    }
    if (!data.constructs.find((e) => e.id === "lilypad")) {
      data.constructs.push(constructs.find((e) => e.id === "lilypad") as Construct);
      patchMessages.push("lilypad added");
    }
    if (!data.constructs.find((e) => e.id === "poisonfrog")) {
      data.constructs.push(constructs.find((e) => e.id === "poisonfrog") as Construct);
      patchMessages.push("poisonfrog added (better than ocean!)");
    }
  }
};

const showPatchMessages = (messages: string[]) => {
  var modal = document.getElementById("modal");
  var closeButton = document.getElementById("modal-close");
  const modalContent = document.getElementById("modal-content");

  if (messages.length === 0) {
    return;
  }

  for (const message of messages) {
    const p = document.createElement("p");
    p.innerHTML = message;
    modalContent?.appendChild(p);
  }

  modal!.style.display = "block";

  closeButton!.onclick = function () {
    modal!.style.display = "none";
  };
  registerTapHandlers(closeButton!, () => modal!.style.display = "none");

  window.onclick = function (event) {
    if (event.target == modal) {
      modal!.style.display = "none";
    }
  };
  registerTapHandlers(window, (event: Event) => {
    if (event.target == modal) {
      modal!.style.display = "none";
    }
  });
};

function patchGeneric(version: string, patchMessages: string[]) {
  if (vLessThan(version, "0.0.2")) {
    patchMessages.push(
      'now more human readable numbers! (million, trillion... etc!) thanks to <a href="https://github.com/JsCommunity/human-format">https://github.com/JsCommunity/human-format</a>',
    );
  }
  if (vLessThan(version, "1.0.2")) {
    patchMessages.push(
      'incredible new update! major version bump! (1.0.2)',
    );
    patchMessages.push(
      'visuals got an overhaul (mostly just images, CSS filters... you\'ll see it!)',
    );
    patchMessages.push(
      'no longer show fractional frogs, apart from in FPS (frogs per second), it\'s mean to the frogs to even think about fractional units!',
    );
  }
  if (vLessThan(version, "1.1.2")) {
    patchMessages.push(
      'font changes, a more playful font for a playful game!',
    );
    patchMessages.push(
      'more mobile friendly layout',
    );
  }
}
