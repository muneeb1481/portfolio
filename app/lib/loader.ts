// Lets entrance animations (navbar, hero) wait until the intro loader has lifted.
export const LOADER_DONE_EVENT = "portfolio:loader-done";

export function markLoaderDone() {
  document.documentElement.dataset.loaded = "true";
  window.dispatchEvent(new Event(LOADER_DONE_EVENT));
}

// Runs the callback once the loader is done, or right away if it already is.
// Returns a function that cancels the wait.
export function onLoaderDone(callback: () => void): () => void {
  if (document.documentElement.dataset.loaded === "true") {
    callback();
    return () => {};
  }
  window.addEventListener(LOADER_DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(LOADER_DONE_EVENT, callback);
}
