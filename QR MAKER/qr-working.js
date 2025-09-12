// QR Code Generator using proven QRCode.js library
class QRCodeGenerator {
    constructor() {
        this.urlInput = document.getElementById('urlInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.qrSection = document.getElementById('qrSection');
        this.qrCodeDiv = document.getElementById('qrcode');
        this.errorMessage = document.getElementById('errorMessage');
        
        this.currentQRCode = null;
        this.currentURL = '';
        
        this.init();
    }
    
    init() {
        this.generateBtn.addEventListener('click', () => this.generateQRCode());
        this.downloadBtn.addEventListener('click', () => this.downloadQRCode());
        this.clearBtn.addEventListener('click', () => this.clearQRCode());
        
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateQRCode();
            }
        });
        
        this.urlInput.addEventListener('input', () => {
            this.clearError();
        });
    }
    
    validateURL(url) {
        if (!url.trim()) {
            return { valid: false, message: 'Please enter a URL' };
        }
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        try {
            new URL(url);
            return { valid: true, url: url };
        } catch (error) {
            return { valid: false, message: 'Please enter a valid URL' };
        }
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.opacity = '1';
    }
    
    clearError() {
        this.errorMessage.textContent = '';
        this.errorMessage.style.opacity = '0';
    }
    
    generateQRCode() {
        const inputValue = this.urlInput.value;
        const validation = this.validateURL(inputValue);
        
        if (!validation.valid) {
            this.showError(validation.message);
            return;
        }
        
        // Check if QRCode library is available
        if (typeof QRCode === 'undefined') {
            this.showError('QR code library not loaded. Please refresh the page.');
            return;
        }
        
        try {
            this.generateBtn.textContent = 'Generating...';
            this.generateBtn.disabled = true;
            this.clearError();
            
            // Clear previous QR code
            this.qrCodeDiv.innerHTML = '';
            
            // Create a container div for the QR code
            const qrContainer = document.createElement('div');
            qrContainer.style.display = 'inline-block';
            this.qrCodeDiv.appendChild(qrContainer);
            
            // Generate QR code using the proven library
            const qrcode = new QRCode(qrContainer, {
                text: validation.url,
                width: 256,
                height: 256,
                colorDark: '#2d3748',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M
            });
            
            // Store reference and show section
            this.currentQRCode = qrcode;
            this.currentURL = validation.url;
            this.qrSection.classList.add('show');
            this.urlInput.value = validation.url;
            
            // Add styling to the generated QR code
            setTimeout(() => {
                const canvas = qrContainer.querySelector('canvas');
                const img = qrContainer.querySelector('img');
                
                if (canvas) {
                    canvas.style.borderRadius = '8px';
                    canvas.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                } else if (img) {
                    img.style.borderRadius = '8px';
                    img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }
            }, 100);
            
        } catch (error) {
            this.showError('Failed to generate QR code: ' + error.message);
            console.error('QR Code generation error:', error);
        } finally {
            this.generateBtn.textContent = 'Generate QR Code';
            this.generateBtn.disabled = false;
        }
    }
    
    downloadQRCode() {
        if (!this.currentQRCode) {
            this.showError('No QR code to download');
            return;
        }
        
        try {
            const qrContainer = this.qrCodeDiv.querySelector('div');
            if (!qrContainer) {
                this.showError('No QR code found');
                return;
            }
            
            // Try to get canvas first, then img
            const canvas = qrContainer.querySelector('canvas');
            const img = qrContainer.querySelector('img');
            
            if (canvas) {
                // Download from canvas
                const link = document.createElement('a');
                link.download = `linktoqrmaker-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
            } else if (img) {
                // Download from img
                const link = document.createElement('a');
                link.download = `linktoqrmaker-${Date.now()}.png`;
                link.href = img.src;
                link.target = '_blank';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
            } else {
                this.showError('Unable to download QR code');
            }
            
        } catch (error) {
            this.showError('Failed to download QR code');
            console.error('Download error:', error);
        }
    }
    
    clearQRCode() {
        this.qrCodeDiv.innerHTML = '';
        this.qrSection.classList.remove('show');
        this.urlInput.value = '';
        this.currentQRCode = null;
        this.currentURL = '';
        this.clearError();
        this.urlInput.focus();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if QRCode library is loaded
    if (typeof QRCode === 'undefined') {
        console.error('QRCode library not loaded');
        document.getElementById('errorMessage').textContent = 'QR code library failed to load. Please refresh the page.';
        document.getElementById('errorMessage').style.opacity = '1';
        return;
    }
    
    console.log('QRCode library loaded successfully');
    new QRCodeGenerator();
});

// Add visual feedback
document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    
    if (urlInput) {
        urlInput.addEventListener('focus', () => {
            urlInput.parentElement.style.transform = 'scale(1.02)';
        });
        
        urlInput.addEventListener('blur', () => {
            urlInput.parentElement.style.transform = 'scale(1)';
        });
    }
});
