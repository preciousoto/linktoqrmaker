# LinktoQRMaker

Convert any website link to a scannable QR code instantly! LinktoQRMaker is a modern, fast, and free QR code generator that transforms URLs into beautiful QR codes that work perfectly with any phone camera or QR scanner app.

**Website:** [linktoqrmaker.com](https://linktoqrmaker.com)

## Features

- ✨ Clean, modern UI with responsive design
- 🔗 Automatic URL validation and formatting
- 📱 Mobile-friendly interface
- ⬇️ Download QR codes as PNG images
- 🎨 Beautiful gradient design with smooth animations
- ⚡ Instant QR code generation
- 🔍 High-quality QR codes with error correction

## How to Use

1. Open `index.html` in your web browser
2. Enter a website URL in the input field (e.g., `google.com` or `https://example.com`)
3. Click "Generate QR Code" or press Enter
4. Your QR code will appear instantly
5. Use "Download QR Code" to save the image
6. Use "Clear" to start over

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **QR Code Library**: qrcode.js (loaded via CDN)
- **Styling**: Modern CSS with flexbox, gradients, and animations
- **Fonts**: Inter font family for clean typography

## Files Structure

```
LinktoQRMaker/
├── index.html      # Main HTML file
├── style.css       # CSS styles  
├── qrcode-lib.js   # QR code generation library
├── qr-working.js   # Application logic
└── README.md       # This file
```

## Browser Compatibility

Works in all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Features in Detail

### URL Validation
- Automatically adds `https://` if protocol is missing
- Validates URL format before generating QR code
- Shows helpful error messages for invalid inputs

### QR Code Generation
- Uses high-quality QR code generation with error correction
- 256x256 pixel resolution for crisp scanning
- Professional color scheme (dark gray on white)

### User Experience
- Smooth animations and transitions
- Responsive design works on desktop and mobile
- Keyboard shortcuts (Enter to generate)
- Visual feedback for interactions

## Getting Started

Simply open `index.html` in any modern web browser or visit [linktoqrmaker.com](https://linktoqrmaker.com). No installation or setup required!

The application works entirely in the browser with embedded libraries for reliable offline functionality.
