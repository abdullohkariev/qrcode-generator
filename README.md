# QR Code Generator

A small web app that generates QR codes for URLs, plain text and contact cards (vCard). Everything runs in the browser, so no data leaves the page.

## Features

- **URL**: encode a web link.
- **Text**: encode any plain text.
- **Contact (vCard)**: encode a name, phone, email, organization and website so scanning adds a contact.
- **Export**: download the code as PNG or SVG.
- **Copy**: copy the encoded content to the clipboard.

## Tech stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) for dev server and build
- [Tailwind CSS](https://tailwindcss.com/) 4
- [qrcode](https://www.npmjs.com/package/qrcode) for QR generation
- [lucide-react](https://lucide.dev/) for icons

## Getting started

Requires Node.js 18+.

```bash
git clone https://github.com/abdullohkariev/qrcode-generator.git
cd qrcode-generator
npm install
npm run dev
```

Then open the local URL that Vite prints (usually http://localhost:5173).

## Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the development server                  |
| `npm run build`   | Build a deployable `dist/` folder             |
| `npm run preview` | Preview the production build locally          |

## Project structure

```
index.html                 App entry HTML
src/main.jsx               React entry point
src/QRCodeGenerator.jsx    Main component (tabs, forms, QR rendering, export)
src/index.css              Tailwind import
vite.config.js             Vite + React + Tailwind config
```

## Deployment

Run `npm run build` and serve the `dist/` folder on any static host (Netlify, Vercel, GitHub Pages, etc.).

## Privacy

QR codes are generated locally in your browser. Nothing is uploaded or stored.
