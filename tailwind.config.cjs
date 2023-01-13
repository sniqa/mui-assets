module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    minHeight: {
      16: "4rem",
    },
    minWidth: {
      48: "12rem",
      72: "18rem",
      32: "8rem",
    },
    extend: {},
  },
  // important: "#root",
  corePlugins: {
    preflight: false,
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/line-clamp")],
};
