// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Only process files on initial startup, not on nodemon restarts
const isFirstRun = !process.env.NODEMON_RESTART;
process.env.NODEMON_RESTART = 'true';

/**
 * Injects environment variables into the env.js file.
 * Handles different logic for production and development environments.
 */
function injectEnvVariables() {
  const envJsPath = path.join(__dirname, 'env.js');
  let envJsContent = fs.readFileSync(envJsPath, 'utf8');
  
  // In production, don't inject the API key - it will be handled by cloudbuild.yaml
  if (isProduction) {
    console.log('Production environment detected - API key will be injected by Cloud Build');
  } else {
    // Replace the placeholder with the actual API key in development
    envJsContent = envJsContent.replace(
      "OPENWEATHERMAP_API_KEY: ''",
      `OPENWEATHERMAP_API_KEY: '${process.env.OPENWEATHERMAP_API_KEY || ''}'`
    );
    console.log('Development environment - injecting API key from .env file');
  }
  
  // Write the updated content back to the file
  fs.writeFileSync(path.join(__dirname, 'public', 'env.js'), envJsContent);
  console.log('Environment variables injected into env.js');
}

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log('Created public directory');
}

// Only process files on initial startup
if (isFirstRun) {
  console.log('First run detected - processing files');
  // Inject environment variables
  injectEnvVariables();
  
  // Check for incorrect image references
  validateImageReferences();
  
  // Copy necessary files to public directory
  copyFilesToPublic();
} else {
  console.log('Nodemon restart detected - skipping file processing');
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server and listen on the specified port
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Running in ${isProduction ? 'production' : 'development'} mode`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);

/**
 * Copies necessary files to the public directory.
 * Logs the status of each file copy operation.
 */
function copyFilesToPublic() {
  const filesToCopy = ['index.html', 'script.js', '404.html'];
  
  filesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, file);
    const destPath = path.join(__dirname, 'public', file);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to public directory`);
    } else {
      console.warn(`Warning: ${file} not found in source directory`);
    }
  });

  // Ensure styles directory exists in public
  const publicStylesDir = path.join(__dirname, 'public', 'styles');
  if (!fs.existsSync(publicStylesDir)) {
    fs.mkdirSync(publicStylesDir, { recursive: true });
    console.log('Created public/styles directory');
  }
  
  console.log('All necessary files have been copied to the public directory');
}

/**
 * Validates that there are no hard-coded references to the local image file.
 * Checks HTML files for incorrect image references.
 */
function validateImageReferences() {
  const indexHtmlPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Check for any references to the local image file
    if (indexHtml.includes('IMG_1542.jpeg') && !indexHtml.includes('storage.googleapis.com')) {
      console.warn('WARNING: Found references to local image file IMG_1542.jpeg');
      console.warn('Make sure all image references use: https://storage.googleapis.com/jakoblangtry.com/profile.jpeg?v=3');
    } else {
      console.log('Image references validated successfully');
    }
  }
} 