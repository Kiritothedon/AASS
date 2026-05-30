/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#060910',
          gold: '#C7A740',
          white: '#f0f6fc',
        },
        secondary: {
          gray: '#161b22',
          muted: '#8b949e',
          dark: '#21262d',
        },
        gtp: {
          'bg-0': '#060910',
          'bg-1': '#0d1117',
          'bg-2': '#161b22',
          'bg-3': '#1c2128',
          blue: '#3b82f6',
          'blue-light': '#60a5fa',
          border: '#30363d',
        },
        accent: {
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
