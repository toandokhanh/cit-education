/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // hoặc 'class' nếu bạn muốn sử dụng dark mode theo class
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

