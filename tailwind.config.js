import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom-shape': '76% 24% 77% 23% / 0% 100% 0% 100%',
      },
      colors: {
        primary: '#F5F7F8',
        secondary: '#00EACE', 
        primarybtn: '#ed145b',
        secondarybtn: '#E5E7EB',
      },
    },
  },
  plugins: [
    import('@tailwindcss/line-clamp'),
    daisyui
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

