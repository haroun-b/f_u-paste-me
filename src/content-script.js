const _browser = window.chrome ?? window.browser;
// --- DO NOT MODIFY ABOVE THIS LINE ---

document.addEventListener("keydown", (event) => {
  /**
   * @type {string | undefined}
   */
  const vBeforePaste = document.activeElement.value;

  /**
   * @type {{
   * selectionStart: number | null | undefined,
   * selectionEnd: number | null | undefined
   * }}
   */
  const { selectionStart, selectionEnd } = document.activeElement;
  const isReplace =
    typeof vBeforePaste === "string" &&
    selectionStart !== selectionEnd &&
    selectionStart === 0 &&
    selectionEnd === vBeforePaste.length;

  _browser.storage.local.get(["modifier"]).then(({ modifier }) => {
    /**
     * @type {"ctrl" | "meta"}
     */
    const preferedModifier =
      modifier ?? (navigator.userAgent.match(/mac/i) ? "meta" : "ctrl");

    if (event.key?.toLowerCase() === "v" && event[`${preferedModifier}Key`]) {
      pasteFromClipboard(vBeforePaste, isReplace);
    }
  });
});

/**
 * @param {string | undefined} vBeforePaste
 * @param {boolean} isReplace
 * @returns {void}
 */
function pasteFromClipboard(vBeforePaste, isReplace) {
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

  if (vBeforePaste !== activeEl.value || isReplace) {
    return;
  }

  navigator.clipboard.readText().then((text) => {
    const { value, selectionStart, selectionEnd } = activeEl;

    activeEl.value = value
      .slice(0, selectionStart)
      .concat(text, value.slice(selectionEnd));

    const newCursorPos = selectionStart + text.length;
    activeEl.selectionStart = newCursorPos;
    activeEl.selectionEnd = newCursorPos;

    // input and change events are fired so as to not break any functionality dependant on them, e.g. React controlled components
    const eventProps = { bubbles: true, cancelable: false };
    activeEl.dispatchEvent(new Event("input", eventProps));
    activeEl.dispatchEvent(new Event("change", eventProps));
  });
}
