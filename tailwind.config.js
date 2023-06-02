/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'noto': ['Noto Sans JP', 'sans-serif'],
      'ubuntu': ['Ubuntu', 'sans-serif'],
      'lato': ['Lato', 'sans-serif'],
    },
    backgroundImage: {
      'login': "url('/src/assets/loginScreen.jpg')",
    }
  },
  plugins: [],
}
