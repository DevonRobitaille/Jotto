/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '5px 5px 0px 1px rgba(0, 0, 0, 1)',
      }
    },
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'score': {
        0: '#F84848',
        1: '#FC6E25',
        2: '#F29400',
        3: '#DBB800',
        4: '#B8DA00',
        5: '#80F848'
      }
    }
  },
  plugins: [],
}
