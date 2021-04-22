module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
  ],
  plugins: ["@babel/plugin-transform-react-jsx"],
};
