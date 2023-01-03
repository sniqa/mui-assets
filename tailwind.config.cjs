module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')],
}