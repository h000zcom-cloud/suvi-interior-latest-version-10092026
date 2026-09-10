const KEY = "suvi-intro-seen";

const seen = typeof window !== "undefined" && window.sessionStorage.getItem(KEY) === "1";
if (!seen && typeof window !== "undefined") window.sessionStorage.setItem(KEY, "1");

export const showIntro = !seen;
export const introDelay = showIntro ? 4.3 : 0.15;
