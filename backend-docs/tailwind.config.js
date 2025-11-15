/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // переопределяем для удобства (используются в компонентах)
        link: 'var(--tw-link, #0366d6)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
