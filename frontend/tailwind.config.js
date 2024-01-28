/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondFontColor: '#FFF',
        homeColor: '#3E64FF',
        mainBGButtonColor: '#97979715',
        secondBGButtonColor: '#3E64FF',
        mainBGButtonColorHover: '#97979750',
        errorMessageBGColor: '#B91C1C90',
      },
    },
    gridTemplateColumns: {
      authForm: '1.5fr 3fr',
      two: '1fr 1fr',
    },
  },
  plugins: [],
};
