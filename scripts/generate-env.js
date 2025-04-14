const fs = require('fs');
const path = require('path');

const apiKey = process.env.OPENWEATHERMAP_API_KEY;

if (!apiKey) {
  console.error('Error: OPENWEATHERMAP_API_KEY environment variable is not set.');
  process.exit(1);
}

const envContent = `// Client-side environment variables
const ENV = {
    OPENWEATHERMAP_API_KEY: '${apiKey}'
};

// Expose the environment to the window
window.ENV = ENV;
`;

const publicDir = path.join(__dirname, '..', 'public');
const outputPath = path.join(publicDir, 'env.js');

// Ensure public directory exists (it should, but doesn't hurt to check)
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(outputPath, envContent);

console.log(`Successfully generated ${outputPath} with API key.`); 