module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: ["light", "dark", "synthwave", "cupcake"], // Puedes agregar más temas aquí
    },
  };
  