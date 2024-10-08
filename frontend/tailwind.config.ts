/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jua: ['"Jua"', 'sans-serif'], // Jua 폰트를 여기 추가
      },
      flex: {
        2: '2 2 0%',
        3: '3 4 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
        9: '9 9 0%',
      },
      colors: {
        db_white: '#FFF3E3',
        db_sub: '#FFCDAC',
        db_main: '#FFA45D',
        db_hover: '#FF872A',
        db_black: '#5D5E59',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'), // Adding the line clamp plugin
  ],
};
