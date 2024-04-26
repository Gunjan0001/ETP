/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('../src/assets/images/png/bg_login.png')",
      },
      screens: {
        x2l: '1250px',
        x4l: '1500px',
      },
    },
  },
  plugins: [],
};
