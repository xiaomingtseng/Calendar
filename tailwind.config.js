/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 使用 class 策略來控制暗黑模式
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'button': {
          'color-scheme': 'light !important',
          'appearance': 'none !important',
          '-webkit-appearance': 'none !important',
          '-moz-appearance': 'none !important',
        },
      })
    }
  ],
}
