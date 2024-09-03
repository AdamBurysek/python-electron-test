/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          'Helvetica Neue',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Open Sans',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
}
