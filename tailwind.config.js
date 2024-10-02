module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#FFFFFF',
        secondary: '#F6F6F6',
        button: '#071D3D',
        'main-text': '#0E1422',
        'secondary-text': '#474B57',
      },
      fontFamily: {
        inter: ['inter']
      },
      padding: {
        'custom-sm': '0.5rem 0.5rem 0.5rem 0.5rem',
        'custom-md': '1rem 1rem 1rem 1rem',
        'custom-lg': '2rem 2rem 2rem 2rem',
      },
      margin: {
        'sm': '0.5rem 0.5rem 0.5rem 0.5rem',
        'md': '1rem 1rem 1rem 1rem',
        'lg': '2rem 2rem 2rem 2rem',
      }
    },
  },
  plugins: [],
}
