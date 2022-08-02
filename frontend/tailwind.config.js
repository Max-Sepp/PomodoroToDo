/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'purple': '#F3E0EC',
      'indigo': '#360568',
      'l-green': '#BFD7B5',
      'd-green': '#4B644A',
      'white': '#F2E7C9',
      'transparent': 'transparent',
      'black': '#090C09'
    },
    extend: {
      visibility: ["group-hover"],
    },
  },
  plugins: [],
}
