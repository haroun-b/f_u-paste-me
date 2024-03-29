const _browser = window.chrome ?? window.browser;
// --- DO NOT MODIFY ABOVE THIS LINE ---

document.addEventListener("keydown", (event) => {
  if ((!event.metaKey && !event.ctrlKey) || event.key?.toLowerCase() !== "v") {
    return;
  }

  /**
   * @type {{
   * value: string | undefined,
   * selectionStart: number | null | undefined,
   * selectionEnd: number | null | undefined
   * }}
   */
  const {
    value: vBeforePaste,
    selectionStart,
    selectionEnd
  } = document.activeElement;

  const isReplace =
    typeof vBeforePaste === "string" &&
    selectionStart !== selectionEnd &&
    selectionStart === 0 &&
    selectionEnd === vBeforePaste.length;

  _browser.storage.local.get(["modifier", "pasteCount"]).then(
    /**
     * @type StorageGetCallback
     */
    ({ modifier, pasteCount }) => {
      const preferedModifier =
        modifier ?? (navigator.userAgent.match(/mac/i) ? "meta" : "ctrl");

      if (event[`${preferedModifier}Key`]) {
        pasteFromClipboard(vBeforePaste, isReplace, pasteCount);
      }
    }
  );
});

/**
 * @param {string | undefined} vBeforePaste
 * @param {boolean} isReplace
 * @param {number | undefined} pasteCount
 * @returns {void}
 */
function pasteFromClipboard(vBeforePaste, isReplace, pasteCount = 0) {
  const supportedInputTypes = [
    "email",
    "number",
    "password",
    "search",
    "tel",
    "text",
    "url"
  ];

  const activeEl = document.activeElement;

  if (
    !(activeEl instanceof HTMLInputElement) &&
    !(activeEl instanceof HTMLTextAreaElement)
  ) {
    return;
  }

  if (
    activeEl instanceof HTMLInputElement &&
    !supportedInputTypes.includes(activeEl.type)
  ) {
    return;
  }

  // checks if paste already happened
  // avoids duplicate pasting in paste-enabled inputs
  if (vBeforePaste !== activeEl.value || isReplace) {
    return;
  }

  navigator.clipboard.readText().then((text) => {
    const { value, selectionStart, selectionEnd } = activeEl;

    // selectionStart and selectionEnd are null on: email and number inputs
    if (selectionStart != null && selectionEnd != null) {
      activeEl.value = value
        .slice(0, selectionStart)
        .concat(text, value.slice(selectionEnd));

      const newCursorPos = selectionStart + text.length;
      activeEl.selectionStart = newCursorPos;
      activeEl.selectionEnd = newCursorPos;
    } else {
      if (activeEl.value === text) return;

      activeEl.value = text;
    }

    // input and change events are fired so as to not break any functionality dependant on them, e.g. React controlled components
    const eventProps = { bubbles: true, cancelable: false };
    activeEl.dispatchEvent(new Event("input", eventProps));
    activeEl.dispatchEvent(new Event("change", eventProps));

    _browser.storage.local.set({
      pasteCount: pasteCount + 1
    });
  });
}
