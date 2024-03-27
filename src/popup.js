const _browser = window.chrome ?? window.browser;
// --- DO NOT MODIFY ABOVE THIS LINE ---

const shortcuts = document.querySelectorAll("#shortcuts>kbd");

_browser.storage.local.get(["modifier"]).then(({ modifier }) => {
  /**
   * @type {"ctrl" | "meta"}
   */
  const preferedModifier =
    modifier ?? (navigator.userAgent.match(/mac/i) ? "meta" : "ctrl");

  shortcuts.forEach((shortcut) => {
    if (shortcut.dataset.modifier === preferedModifier) {
      shortcut.className = "selected";
    }

    shortcut.addEventListener("click", () => {
      if (shortcut.className === "selected") return;
      setPreferedModifier(shortcut.dataset.modifier);
    });
  });
});

/**
 * @param {string} modifier
 */
function setPreferedModifier(modifier) {
  _browser.storage.local.set({ modifier });

  shortcuts.forEach((shortcut) => {
    shortcut.className =
      shortcut.dataset.modifier === modifier ? "selected" : "";
  });
}
