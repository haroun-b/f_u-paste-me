const _browser = window.chrome ?? window.browser;
// --- DO NOT MODIFY ABOVE THIS LINE ---

document.addEventListener("keydown", (event) => {
  _browser.storage.local.get(["modifier"]).then(({ modifier }) => {
    const preferedModifier =
      modifier ?? (navigator.userAgent.match(/mac/i) ? "meta" : "ctrl");

    if (event.key.toLowerCase() === "v" && event[`${preferedModifier}Key`]) {
      pasteFromClipboard();
    }
  });
});

function pasteFromClipboard() {
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

  navigator.clipboard.readText().then((text) => {
    activeEl.value += text;

    // input and change events are fired so as to not break any functionality dependant on them, e.g. React controlled components
    const eventProps = { bubbles: true, cancelable: false };
    activeEl.dispatchEvent(new Event("input", eventProps));
    activeEl.dispatchEvent(new Event("change", eventProps));
  });
}
