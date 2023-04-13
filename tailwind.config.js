/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "main": "#000403",
        "secondary": "#ccd8df",
        "action": "#8E4162"
      },
      fontSize: {
        "h1": "4rem",
        "h2": "2.25rem",
        "h3": "1.75rem"
      }
    },
  },
  plugins: [],
}
