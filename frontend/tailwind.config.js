/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // Plugin to hide the scrollbar
    require("tailwind-scrollbar"), // Plugin for custom scrollbar styles
  ],
};
