module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    inset: ['hover', 'focus', 'active'],
    neumorphismInset: ['focus', 'active'],
    extend: {},
  },
  plugins: [
    require('tailwindcss-neumorphism')
  ],
}
