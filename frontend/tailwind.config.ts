/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jua: ['"Jua"', 'sans-serif'], // Jua 폰트를 여기 추가
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Adding the line clamp plugin
  ],
};
