const KEY = "suvi-intro-seen";

let seen = true;
try {
  seen = window.sessionStorage.getItem(KEY) === "1";
  window.sessionStorage.setItem(KEY, "1");
} catch {
  // Storage restrictions must never prevent the site from rendering.
}

export const showIntro = !seen;
export const introDelay = 0;
