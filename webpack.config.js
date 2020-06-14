const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/eSignPopUp",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "eSignPopUp.min.js",
    library: "eSignPopUp",
    libraryTarget: "umd",
  },
};
