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
        primary: "var(--primary)",
        "Header-primary": "var(--header-primary)",
        "Header-secondary": "var(--header-secondary)",
        "Paragraph-primary": "var(--paragraph-primary)",
        "paragraph-secondary": "var(--paragraph-secondary)",
        "button-primary": "var(--button-text-color)",
        "btn-primary": "var(--btn-primary-text)",
        "btn-secondary": "var(--btn-secondary-text)",
        "btn-success": "var(--btn-success-text)",
        "btn-success-dark": "var(--btn-success-dark-text)",
        "btn-danger": "var(--btn-danger-text)",
        "btn-warning": "var(--btn-warning-text)",
      },
      backgroundColor: {
        "Main-background": "var(--bg-primary)",
        "Secondary-background": "var(--bg-secondary)",
        "Third-background": "var(--bg-third)",
        "Input-background": "var(--Input-background-color)",
        "Overlay-background": "var(--overlay-background-color)",
        "button-background": "var(--button-background-color)",
        "pill-circle": "var(--bg-pill-circle)",
        "btn-primary": "var(--btn-primary-bg)",
        "btn-secondary": "var(--btn-secondary-bg)",
        "btn-success": "var(--btn-success-bg)",
        "btn-danger": "var(--btn-danger-bg)",
        "btn-warning": "var(--btn-warning-bg)",
        "secondary-hover": "var(--secondary-hover-background-color)",
        "fourth-background": "var(--fourth-background-color)",
      },
      borderColor: {
        "primary-color": "var(--border-primary)",
        "secondary-color": "var(--border-secondary)",
        "third-color": "var(--border-third)",
        "success-color": "var(--border-success)",
        "success-muted": "var(--border-success-muted)",
        "success-light-color": "var(--border-success-light)",
        "success-dark-color": "var(--border-success-dark)",
        danger: "var(--border-danger)",
        "danger-light": "var(--border-danger-light)",
        "danger-muted": "var(--border-danger-muted)",
        "danger-dark": "var(--border-danger-dark)",
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
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
