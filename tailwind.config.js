/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.liquid',
    './assets/scripts/**/*.{ts,js}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
