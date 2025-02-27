# Jakob Langtry's Personal Website

A terminal-style personal website showcasing my professional profile and projects. The website features a command-line interface that visitors can use to navigate and explore content in a unique way.

## 🛠️ Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Cloud Platform for hosting

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jakoblangtry-com.git
   cd jakoblangtry-com
   ```

2. Open the project in your preferred code editor.

3. Start a local development server (you can use Python's built-in server or any other method):
   ```bash
   python -m http.server 8000
   # or
   python3 -m http.server 8000
   ```

4. Visit `http://localhost:8000` in your web browser.

### Available Commands

The website features an interactive terminal interface with the following commands:
- Type `help` to see all available commands
- Navigate through the interface using keyboard inputs
- Use arrow keys for command history

## 🌐 Deployment

The website is automatically deployed using Google Cloud Build to Google Cloud Storage. The deployment process is configured in `cloudbuild.yaml` and includes:

1. Copying static files to the Cloud Storage bucket
2. Setting appropriate Cache-Control headers
3. Configuring public access permissions

### Prerequisites for Deployment

- Google Cloud Platform account
- Configured Cloud Build trigger
- Storage bucket named `jakoblangtry.com`

## 📁 Project Structure

```
jakoblangtry-com/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Terminal functionality and interactions
├── 404.html           # Custom 404 error page
├── cloudbuild.yaml    # GCP deployment configuration
└── IMG_1542.jpeg      # Profile image
```