# Barcode Label Generator

A modern React-based barcode label generator with live preview and high-quality PNG/JPEG export functionality.

---

## Features

- Generate barcode labels instantly
- Live preview updates
- Export as PNG or JPEG
- High-quality image download
- Barcode generation using CODE128
- Responsive UI
- Modern Tailwind CSS design

---

## Tech Stack

- React
- Tailwind CSS
- JsBarcode
- html-to-image

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/barcode-generator.git
```

Go to project folder:

```bash
cd barcode-generator
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Dependencies

Install required packages:

```bash
npm install jsbarcode html-to-image
```

---

## Project Structure

```bash
src/
 ├── components/
 │    └── BarcodeLabel.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## Features Overview

### Barcode Generation

Uses `JsBarcode` library to generate dynamic CODE128 barcodes.

### Image Export

Uses `html-to-image` library to export the label card as:

- PNG
- JPEG

### High Quality Export

```js
pixelRatio: 4
```

provides sharp downloadable images.

---

## Usage

1. Enter brand name
2. Enter product name
3. Select size
4. Enter colour
5. Enter price
6. Enter SKU code
7. Select export format
8. Click download

---

## Screenshot

Add your project screenshot here.

```md
![App Screenshot](./screenshot.png)
```

---

## Example SKU

```txt
ANAR-M-BLK
```

---

## Future Improvements

- PDF export
- Print functionality
- QR code support
- Custom label sizes
- Dark mode
- Database integration

---

## Author

Sushant

---

## License

MIT License