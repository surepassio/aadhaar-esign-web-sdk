const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/eSignPopUp.js",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "eSignPopUp.js",
    library: "eSignPopUp",
    libraryTarget: "var",
  },
  externals: {
    events: {
      commonjs: "events",
      commonjs2: "events",
      amd: "events",
      root: "EventEmitter",
    },
  },
  optimization: {
    runtimeChunk: true,
  },
};
