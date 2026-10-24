# QR Code Generator

A fast, private QR code generator for **links**, **plain text** and **contact cards**. It runs entirely in your browser: nothing is uploaded, tracked or stored.

**Live site:** https://abdullohkariev.github.io/qrcode-generator/

## Features

- **Three modes**
  - **URL**: type `example.com` and `https://` is added for you.
  - **Text**: encode any text or note.
  - **Contact**: creates a vCard (name, phone, email, organization, website) that phones can save straight to contacts.
- **Live preview**: the QR code updates as you type.
- **Download** the code as a PNG, or **copy** the encoded data to the clipboard.
- **Light and dark themes**: follows your system setting, with a toggle that remembers your choice.
- **Responsive**: works on phones, tablets and desktops.
- **No tracking, no backend, no build step.**

## Usage

Open `index.html` in a browser. To serve it locally instead:

```bash
npx serve .
```

1. Pick a tab (URL, Text or Contact).
2. Fill in the fields. The QR code appears on the right.
3. Click **Download** to save a PNG, or **Copy Data** to copy the encoded text.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup |
| `style.css` | All styling, including the light and dark theme variables |
| `script.js` | Tabs, QR generation, vCard building, download/copy, theme toggle |
| `qrious.min.js` | [QRious](https://github.com/neocotic/qrious), draws the QR code on a canvas |
| `logo.svg` | Logo and favicon |
| `.github/workflows/deploy.yml` | Deploys the site to GitHub Pages on every push to `main` |

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which publishes the site to GitHub Pages. If you add a new file the page needs (an image, a script), add it to the `cp` line in `deploy.yml`, otherwise it won't be published.

## Credits

Designed and built by [Abdulloh Kariev](https://akariev.site) · [akariev.site](https://akariev.site)

QR drawing by [QRious](https://github.com/neocotic/qrious).
