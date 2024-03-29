const _browser = window.chrome ?? window.browser;
// --- DO NOT MODIFY ABOVE THIS LINE ---

/**
 * @typedef {"meta" | "ctrl"} Modifier
 */
/**
 * @typedef {function({modifier: Modifier | undefined, pasteCount: number | undefined}): void} StorageGetCallback
 */

const pasteCounterMax = 99_999_999;
const countDisplay = document.getElementById("paste-count");
const shortcuts = document.querySelectorAll("#shortcuts>kbd");

_browser.storage.local.get(["modifier", "pasteCount"]).then(
  /**
   * @type StorageGetCallback
   */
  ({ modifier, pasteCount }) => {
    const preferedModifier =
      modifier ?? (navigator.userAgent.match(/mac/i) ? "meta" : "ctrl");

    countDisplay.textContent =
      pasteCount > pasteCounterMax ? `+${pasteCounterMax}` : pasteCount ?? 0;

    shortcuts.forEach((shortcut) => {
      if (shortcut.dataset.modifier === preferedModifier) {
        shortcut.className = "selected";
      }

      shortcut.addEventListener("click", () => {
        if (shortcut.className === "selected") return;
        setPreferedModifier(shortcut.dataset.modifier);
      });
    });
  }
);

/**
 * @param {Modifier} modifier
 */
function setPreferedModifier(modifier) {
  _browser.storage.local.set({ modifier });

  shortcuts.forEach((shortcut) => {
    shortcut.className =
      shortcut.dataset.modifier === modifier ? "selected" : "";
  });
}
