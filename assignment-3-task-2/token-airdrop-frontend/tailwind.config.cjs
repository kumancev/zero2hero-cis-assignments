/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mob': { 'raw': '(min-height: 350px)' },
      },
    },
  },
  plugins: [],
}
