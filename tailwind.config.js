/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./404.html",
    "./public/**/*.{html,js}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'primary': '#98c379',
        'background': '#000000',
        'terminal-bg': '#000000',
        'github': '#98c379',
        'linkedin': '#98c379',
        'instagram': '#98c379',
      },
      animation: {
        blink: 'blink 1s infinite steps(1)',
      },
    },
  },
  plugins: [],
} 