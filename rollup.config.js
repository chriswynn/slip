import postcss from "rollup-plugin-postcss";

export default {
  input: "src/js/index.js",
  output: {
    file: "public/bundle.js",
    format: "iife"
  },
  plugins: [
    postcss({
      modules: true,
      plugins: []
    })
  ]
};
