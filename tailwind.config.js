/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   // sm: '480px',
    //   // md: '768px',
    //   // lg: '976px',
    //   // xl: '1440px',
    // },
    colors: {
      "Primary": "#00A9FF",
      "Secondary": "#EFF6FF",
      "Heading": "#262626",
      "Inactive": "#D3D3D3",
      "Error": "#EF4444",
      "Success": "#10B981"
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {},
  },
  plugins: [],
}

