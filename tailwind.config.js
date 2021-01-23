module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: 'media',
  theme: {
    colors: {
      gray: {
        900: '#2e2f30',
        800: '#454648',
        700: '#5c5e60',
        600: '#737678',
        500: '#8a8d90',
        400: '#a1a5a8',
        300: '#b8bcc0',
        200: '#cfd4d8',
        100: '#e6ecf0',
      },
      red: '#FF5500',
      green: '#00CFA5'
    },
    neumorphismColor: {
      gray: {
        900: '#2e2f30',
        800: '#454648',
        700: '#5c5e60',
        600: '#737678',
        500: '#8a8d90',
        400: '#a1a5a8',
        300: '#b8bcc0',
        200: '#cfd4d8',
        100: '#e6ecf0',
      }
    },
    neumorphismSize: {
      default: '0.25rem',
    },
    extend: {},
  },
  variants: {
    inset: ['hover', 'focus', 'active'],
    neumorphismInset: ['focus', 'active'],
    extend: {},
  },
  plugins: [
    require('tailwindcss-neumorphism'),
    function({ addUtilities }) {
      const newUtilities = {
        ".text-neumorphism": {
          "textShadow": '-4px -4px 6px rgba(255,255,255,0.7), 4px 4px 6px rgba(0,0,0,0.3)'
        }
      }

      addUtilities(newUtilities)
    }
  ]
}
