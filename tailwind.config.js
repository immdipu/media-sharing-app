/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        "Header-primary": "var(--Header-primary-text-color)",
        "Header-secondary": "var(--Header-secondary-text-color)",
        "Paragraph-primary": "var(--Paragraph-text-color)",
        "button-primary": "var(--button-text-color)",
        "paragraph-secondary": "var(--paragraph-secondary-text-color)",
      },
      backgroundColor: {
        "Main-background": "var(--Main-background-color)",
        "Secondary-background": "var(--Secondary-background-color)",
        "Input-background": "var(--Input-background-color)",
        "Overlay-background": "var(--overlay-background-color)",
        "button-background": "var(--button-background-color)",
        "secondary-hover": "var(--secondary-hover-background-color)",
        "third-background": "var(--third-background-color)",
      },
      borderColor: {
        "primary-color": "var(--border-color)",
        "secondary-color": "var(--border-color-2)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
