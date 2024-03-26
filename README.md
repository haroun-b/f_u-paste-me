<img src="./extras/banner.png" alt="banner" width="100%" />

---

## About

**F_U Paste Me** is a simple browser extension that allows pasting in input fields, ~~even~~ especially in fields where pasting has been disabled.

Made in a couple of hours out of frustration to improve user experience and allow pasting complex passwords copied from password managers for when autofill isn’t fully supported.

The paste shortcut is preset based on the user’s device, `⌘Cmd + V` for Mac, and `Ctrl + V` for Windows and Linux, but it can also be modified to suit individual preferences.

Works in most cases, but in case it doesn't, please feel free to open an issue or maybe even fix it yourself you lazy bastard (if you know how, of course) 😁.

---

## Demo

<img src="./extras/demo.gif" alt="demo" width="100%" />

---

## Installation

<a href=""><img src="./extras/promote-button-chrome.png" alt="Available in the chrome web store" style="max-height: 6rem" /></a>
<a href=""><img src="./extras/promote-button-firefox.png" alt="Get the add-on" style="max-height: 6rem" /></a>

### From source

The directory holding the manifest file can be added as an extension in developer mode in its current state. To load an unpacked extension in developer mode, first clone the repo into your local machine then follow these steps:

#### Chrome:

1. Open the Extension Management page by navigating to `chrome://extensions`.
   - Alternatively, open this page by clicking on the Extensions menu button and selecting **Manage Extensions** at the bottom of the menu.
   - Alternatively, open this page by clicking on the Chrome menu, hovering over **More Tools** then selecting **Extensions**.
2. Enable **Developer Mode** by clicking the toggle switch next to Developer mode.
3. Click the **Load unpacked** button and select the extension directory.

<br />

#### Firefox:

1. enter `about:debugging` in the URL bar
2. click **This Firefox**
3. click **Load Temporary Add-on**
4. open the extension's directory and select any file inside the extension, like: **minfest.json** for example.

**Note: The extension installs and remains installed until you remove it or restart Firefox.**

---

## Privacy

This extension runs locally; connects to no external resources; and does not collect any data.

---

## Credit

- Uses [PicoCSS](https://github.com/picocss/pico) for styling.
- The colourful background used in the demo is a codepen by CJ Gammon: [color shaders](https://codepen.io/cjgammon/pen/ExoZNwe)
